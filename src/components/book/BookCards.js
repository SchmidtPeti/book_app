// src/components/BookCards.js
import React from 'react';
import BookCard from './BookCard';
import { useAppContext } from '../../context/AppContext';
import { useLoadingContext } from '../../context/LoadingContext';

const BookCards = () => {
  const { data } = useAppContext();
  const { loadingCitatum, loadingMoly, loadingGoogleBooks } = useLoadingContext();

  return (
    <>
      {data.map((item) => (
        <BookCard
          key={item.id}
          item={item}
          loadingCitatum={loadingCitatum}
          loadingMoly={loadingMoly}
          loadingGoogleBooks={loadingGoogleBooks}
        />
      ))}
    </>
  );
};

export default BookCards;
