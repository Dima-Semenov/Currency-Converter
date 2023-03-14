import axios from 'axios';
import { debounce } from 'debounce';
import { EXCHANGE_API } from '../constants';

export const countryOptionsMapper = (options) => {
  return options
    .filter((item) => 'currencies' in item)
    .map((item) => ({
      flagIcon: item.flags.svg,
      currencies: Object.keys(item.currencies)[0],
      symbol: item.currencies[Object.keys(item.currencies)[0]].symbol,
      name: item.currencies[Object.keys(item.currencies)[0]].name,
      label: Object.keys(item.currencies)[0] + ' - ' + item.name.common,
    }));
};

export const fetchCurrentPrice = debounce(
  (fromCurrency, toCurrency, setPerOneToCurrency, setIsLoadPrice) => {
    const options = {
      method: 'GET',
      url: EXCHANGE_API,
      params: {
        from: fromCurrency.currencies,
        to: toCurrency.currencies,
        q: '1.0',
      },
      headers: {
        'X-RapidAPI-Key': '6494c504bemsh0e6a52b4929ddd9p1e94f9jsndd076e238407',
        'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com',
      },
    };

    axios
      .request(options)
      .then((response) => {
        setPerOneToCurrency(Number(response.data).toFixed(4));
      })
      .catch(function (error) {
        console.error(error);
      })
      .finally(() => setIsLoadPrice(false));
  },
  400
);
