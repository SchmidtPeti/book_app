import React from 'react';

const BookCitations = ({ item }) => {
  console.log(item.citations)
  return (
    <div className="mt-3">
      <a href={item.url} target="_blank" rel="noopener noreferrer">
        More on Moly
      </a>
      <h6>Citations:</h6>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Citation</th>
            </tr>
          </thead>
          <tbody>
            {item.citations &&
              item.citations.map((citation, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{citation.citation}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookCitations;
