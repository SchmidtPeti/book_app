import React from 'react';
import BookCard from './BookCard';
import { useAppContext } from '../../context/AppContext';
import Spinner from '../../assets/Spinner.gif';

const BookCards = () => {
  const { data, loading, notFoundSearch } = useAppContext();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <img src={Spinner} alt="Loading..." />
      </div>
    );
  }

  if (notFoundSearch) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h2>Not found, please search for classic books</h2>
      </div>
    );
  }

  return (
    <>
      {data.map((item) => (
        <BookCard
          key={item.id}
          item={item}
        />
      ))}
    </>
  );
};

export default BookCards;
