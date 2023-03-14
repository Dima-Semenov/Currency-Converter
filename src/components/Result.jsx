import React, { useContext } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { CurrencyContext } from '../context/CurrencyContext';

const Result = ({
  perOneFromCurrency,
  perOneToCurrency,
  resultPrice,
  isLoadPrice,
}) => {
  const { fromCurrency, toCurrency, amount } = useContext(CurrencyContext);

  return (
    <Box sx={{ textAlign: 'left', marginTop: '3rem' }}>
      {isLoadPrice ? (
        <CircularProgress />
      ) : (
        <>
          <Typography sx={{ color: 'rgb(92, 102, 123)' }}>
            {Number(amount).toFixed(2) + ' ' + fromCurrency.name + ' = '}
          </Typography>

          <Typography
            variant='h5'
            sx={{
              marginTop: '5px',
              fontSize: 'bold',
              color: 'rgb(46, 60, 87)',
            }}
          >
            {resultPrice + ' ' + toCurrency.name}
          </Typography>

          <Box sx={{ marginTop: '.4rem', color: 'rgb(92, 102, 123)' }}>
            <Typography sx={{ fontSize: '14px' }}>
              1{' '}
              {fromCurrency.currencies +
                ' = ' +
                perOneToCurrency +
                ' ' +
                toCurrency.currencies}
            </Typography>
            <Typography sx={{ fontSize: '14px' }}>
              1{' '}
              {toCurrency.currencies +
                ' = ' +
                perOneFromCurrency +
                ' ' +
                fromCurrency.currencies}
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Result;
