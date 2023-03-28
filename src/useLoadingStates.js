import { useState } from 'react';

const useLoadingStates = () => {
  const [loadingCitatum, setLoadingCitatum] = useState(true);
  const [loadingMoly, setLoadingMoly] = useState(true);
  const [loadingGoogleBooks, setLoadingGoogleBooks] = useState(true);

  return {
    loadingCitatum,
    setLoadingCitatum,
    loadingMoly,
    setLoadingMoly,
    loadingGoogleBooks,
    setLoadingGoogleBooks,
  };
};

export default useLoadingStates;