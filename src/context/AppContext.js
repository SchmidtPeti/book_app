// src/context/AppContext.js
import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContext.Provider');
  }
  return context;
};

export const AppContextProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFoundSearch,setnotFoundSearch] = useState(false)

  const updateData = (newData) => {
    setData(newData);
  };

  const values = {
    searchTerm,
    setSearchTerm,
    data,
    updateData,
    loading,
    setLoading,
    notFoundSearch,
    setnotFoundSearch
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
