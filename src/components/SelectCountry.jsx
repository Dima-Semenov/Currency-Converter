import React, { useContext, useMemo } from 'react';
import {
  Autocomplete,
  Box,
  Grid,
  InputAdornment,
  TextField,
} from '@mui/material';
import { CurrencyContext } from '../context/CurrencyContext';

const SelectCountry = ({ value, setValue, label }) => {
  const { countryOptions } = useContext(CurrencyContext);

  return (
    <Grid item xs={12} md={3.5}>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        options={countryOptions}
        disableClearable
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            InputProps={{
              ...params.InputProps,
              startAdornment: value && (
                <InputAdornment position='start'>
                  <img loading='lazy' width='20' src={value.flagIcon} alt='' />
                </InputAdornment>
              ),
            }}
          />
        )}
        renderOption={(props, option) => (
          <Box
            component='li'
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <img loading='lazy' width='20' src={option.flagIcon} alt='' />
            {option.label}
          </Box>
        )}
      />
    </Grid>
  );
};

export default SelectCountry;
