// BookCards.js
import React from 'react';
import BookCard from './BookCard';
import Spinner from '../assets/Spinner.gif';

const BookCards = ({ data, loading, loadingCitatum, loadingMoly, loadingGoogleBooks }) => {
  return (
    <>
      {loading ? (
        <div className="spinner-container">
          <img src={Spinner} alt="Loading..." />
        </div>
      ) : (
        data.map((item) => (
          <BookCard
            key={item.id}
            item={item}
            loadingCitatum={loadingCitatum}
            loadingMoly={loadingMoly}
            loadingGoogleBooks={loadingGoogleBooks}
          />
        ))
      )}
    </>
  );
};

export default BookCards;
