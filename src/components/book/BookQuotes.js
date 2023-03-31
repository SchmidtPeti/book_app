import React from 'react';
import Spinner from '../../assets/Spinner.gif'

const BookQuotes = ({ loadingCitatum, quotes }) => {
  return loadingCitatum ? (
    <div className="spinner-container">
      <img src={Spinner} alt="Loading Citatum..." />
    </div>
  ) : (
    <div className="mt-3">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Quote</th>
            <th scope="col">Author</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((quote, index) => (
            <tr key={index}>
              <td>{quote.idezetszoveg}</td>
              <td>{quote.szerzo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookQuotes;
