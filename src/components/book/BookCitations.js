import React from 'react';

const BookEditions = ({ editions }) => {
  return (
    <div className="mt-3">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Year</th>
            <th scope="col">Publisher</th>
            <th scope="col">Place</th>
            <th scope="col">Pages</th>
            <th scope="col">ISBN</th>
            <th scope="col">Cover</th>
          </tr>
        </thead>
        <tbody>
          {editions &&
            editions.map((edition, index) => (
              <tr key={index}>
                <td>{edition.year}</td>
                <td>{edition.publisher}</td>
                <td>{edition.place}</td>
                <td>{edition.pages}</td>
                <td>{edition.isbn}</td>
                <td>
                  <img src={edition.cover} alt="Edition Cover" height="100" />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookEditions;
