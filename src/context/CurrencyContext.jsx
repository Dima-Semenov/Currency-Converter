import React, { createContext, useEffect, useState } from 'react';
import { COUNTRIES_API, UKRAINE_CURRENCY, USA_LABEL } from '../constants';
import useAxios from '../hooks/useAxios';
import { countryOptionsMapper } from '../utils';

export const CurrencyContext = createContext();

const CurrencyProvider = ({ children }) => {
  const [fromCurrency, setFromCurrency] = useState(null);
  const [toCurrency, setToCurrency] = useState(null);
  const [amount, setAmount] = useState('');
  const [countryOptions, setCountryOptions] = useState([]);
  const [data, error, isLoaded] = useAxios(COUNTRIES_API);

  const value = {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    amount,
    setAmount,
    countryOptions,
  };

  useEffect(() => {
    setCountryOptions((prev) =>
      prev.filter(({ currencies }) => currencies !== fromCurrency.currencies)
    );
  }, [fromCurrency]);

  useEffect(() => {
    if (data.length && !toCurrency && !fromCurrency) {
      const options = countryOptionsMapper(data);

      const usOption = options.find(({ label }) => label === USA_LABEL);
      const ukraineOption = options.find(
        ({ currencies }) => currencies === UKRAINE_CURRENCY
      );

      setFromCurrency(usOption);
      setToCurrency(ukraineOption);
      setCountryOptions(options);
    }
  }, [data]);

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyProvider;
