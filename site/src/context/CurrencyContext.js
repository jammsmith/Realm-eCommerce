import React, { useState, useEffect, useCallback, createContext } from 'react';

export const CurrencyContext = createContext();

export const CurrencyContextProvider = ({ children }) => {
  const [currency, setCurrency] = useState('GBP');

  const url = 'https://ipapi.co/json/';

  const getLocale = useCallback(async () => {
    const response = await window.fetch(url);
    return await response.json();
  }, [url]);

  const getLocaleCurrency = useCallback(async () => {
    const locale = await getLocale();

    switch (locale.continent_code) {
      case 'EU':
        setCurrency(locale.country_code === 'GB' ? 'GBP' : 'EUR');
        break;
      case 'NA':
        setCurrency('USD');
        break;
      default:
    }
  }, [getLocale]);

  useEffect(() => getLocaleCurrency(), [getLocaleCurrency]);

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
