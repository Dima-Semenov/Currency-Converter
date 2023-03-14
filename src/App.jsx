import { useContext, useEffect, useMemo, useState } from 'react';
import { CircularProgress, Container, Grid, Typography } from '@mui/material';
import './App.css';
import InputAmount from './components/InputAmount';
import SelectCountry from './components/SelectCountry';
import SwitchCurrency from './components/SwitchCurrency';
import { CurrencyContext } from './context/CurrencyContext';
import Result from './components/Result';
import { fetchCurrentPrice } from './utils';
import { boxStyles, flexCenter } from './constants';

const App = () => {
  const { fromCurrency, setFromCurrency, toCurrency, setToCurrency, amount } =
    useContext(CurrencyContext);
  const [perOneFromCurrency, setPerOneFromCurrency] = useState(null);
  const [perOneToCurrency, setPerOneToCurrency] = useState(null);
  const [resultPrice, setResultPrice] = useState(0);
  const [isLoadPrice, setIsLoadPrice] = useState(false);

  useEffect(() => {
    if (amount >= 0) {
      setIsLoadPrice(true);
      fetchCurrentPrice(
        fromCurrency,
        toCurrency,
        setPerOneToCurrency,
        setIsLoadPrice
      );
    }
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    setResultPrice(Number(amount * perOneToCurrency).toFixed(4));
    setPerOneFromCurrency(Number(1 / perOneToCurrency).toFixed(4));
  }, [amount, perOneToCurrency, fromCurrency, toCurrency]);

  const styles = useMemo(() => {
    if (!fromCurrency) {
      return { ...boxStyles, ...flexCenter };
    }

    return boxStyles;
  }, [fromCurrency]);

  return (
    <Container maxWidth='md' sx={styles}>
      {!fromCurrency ? (
        <CircularProgress size={'50px'} />
      ) : (
        <>
          <Typography variant='h5' sx={{ marginBottom: '2rem' }}>
            Currency Converter
          </Typography>

          <Grid container spacing={2}>
            <InputAmount />
            <SelectCountry
              value={fromCurrency}
              setValue={setFromCurrency}
              label='From'
            />
            <SwitchCurrency />
            <SelectCountry
              value={toCurrency}
              setValue={setToCurrency}
              label='To'
            />
          </Grid>

          {amount > 0 && (
            <Result
              resultPrice={resultPrice}
              perOneFromCurrency={perOneFromCurrency}
              perOneToCurrency={perOneToCurrency}
              isLoadPrice={isLoadPrice}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default App;
