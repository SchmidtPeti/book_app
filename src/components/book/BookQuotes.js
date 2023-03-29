import React from 'react';
import Spinner from '../../assets/Spinner.gif'

const BookQuotes = ({ loadingCitatum, quotes }) => {
  return loadingCitatum ? (
    <div className="spinner-container">
      <img src={Spinner} alt="Loading Citatum..." />
    </div>
  ) : (
    quotes.map((quote, index) => (
      <div key={index} className="card-text mb-3">
        <blockquote className="blockquote">
          <p>{quote.idezetszoveg}</p>
          <footer className="blockquote-footer">{quote.szerzo}</footer>
        </blockquote>
      </div>
    ))
  );
};

export default BookQuotes;
