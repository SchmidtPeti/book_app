// BookCard.js
import React from 'react';
import Spinner from '../assets/Spinner.gif';

const BookCard = ({ item, loadingCitatum, loadingMoly, loadingGoogleBooks }) => {
  return (
    <div className="card mb-3 card-item">
      <div className="row g-0">
        <div className="col-md-4">
          {loadingGoogleBooks ? (
            <div className="spinner-container">
              <img src={Spinner} alt="Loading Google Books..." />
            </div>
          ) : (
            <img src={item.image} alt={item.title} />
          )}
        </div>
        <div className="col-md-8">
          <div className="card-body">
            {loadingMoly ? (
              <div className="spinner-container">
                <img src={Spinner} alt="Loading Moly..." />
              </div>
            ) : (
              <>
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">Score: {item.score}</p>
              </>
            )}
            {loadingCitatum ? (
              <div className="spinner-container">
                <img src={Spinner} alt="Loading Citatum..." />
              </div>
            ) : (
              item.quotes.map((quote, index) => (
                <div key={index} className="card-text mb-3">
                  <blockquote className="blockquote">
                    <p>{quote.idezetszoveg}</p>
                    <footer className="blockquote-footer">
                      {quote.szerzo}
                    </footer>
                  </blockquote>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
