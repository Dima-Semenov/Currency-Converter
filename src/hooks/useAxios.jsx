import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useAxios = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoaded(true);
        const response = await axios(url);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoaded(false);
      }
    };

    fetchData();
  }, [url]);

  return [data, error, isLoaded];
};

export default useAxios;
