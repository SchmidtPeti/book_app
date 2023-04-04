import React from 'react';

const BookQuotes = ({ quotes }) => {
  return (
    <div className="my-3">
      <h4>Quotes</h4>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Quote</th>
            <th scope="col">Author</th>
            <th scope="col">Favorite</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((quote) => (
            <tr key={quote.id}>
              <td>{quote.idezetszoveg}</td>
              <td>{quote.szerzo}</td>
              <td>{quote.kedvenc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookQuotes;
