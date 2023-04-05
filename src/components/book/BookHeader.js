import React from 'react';
import Spinner from '../../assets/Spinner.gif';

const BookHeader = ({ item, loadingMoly }) => {
  if (loadingMoly) {
    return (
      <div className="spinner-container">
        <img src={Spinner} alt="Loading Moly..." />
      </div>
    );
  }

  return (
    <>
      <h5 className="card-title">{item.title}</h5>
      <p className="card-text">Author: {item.author}</p>
    </>
  );
};

export default BookHeader;
