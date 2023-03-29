// src/context/LoadingContext.js
import { createContext, useContext, useState } from 'react';

const LoadingContext = createContext();

export const useLoadingContext = () => {
  return useContext(LoadingContext);
};

export const LoadingProvider = ({ children }) => {
  const [loadingCitatum, setLoadingCitatum] = useState(false);
  const [loadingMoly, setLoadingMoly] = useState(false);
  const [loadingGoogleBooks, setLoadingGoogleBooks] = useState(false);

  const value = {
    loadingCitatum,
    setLoadingCitatum,
    loadingMoly,
    setLoadingMoly,
    loadingGoogleBooks,
    setLoadingGoogleBooks,
  };

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};
