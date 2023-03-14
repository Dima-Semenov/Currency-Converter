import { Grid, InputAdornment, TextField } from '@mui/material';
import React, { useContext } from 'react';
import { CurrencyContext } from '../context/CurrencyContext';

const InputAmount = ({}) => {
  const { amount, setAmount, fromCurrency } = useContext(CurrencyContext);

  return (
    <Grid item xs={12} md>
      <TextField
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        label='Amount'
        placeholder='0'
        fullWidth
        InputProps={{
          type: 'number',
          startAdornment: (
            <InputAdornment position='start'>
              {fromCurrency.symbol}
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  );
};

export default InputAmount;
