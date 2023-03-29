import React from 'react';

const BookDetails = ({ item }) => {
  return (
    <div className="mt-3">
      <img src={item.cover} alt={item.title} />
      <p>{item.description}</p>
      <a href={item.url} target="_blank" rel="noopener noreferrer">
        More on Moly
      </a>
      <h6>Citations:</h6>
      {item.citations &&
        item.citations.map((citation, index) => (
          <p key={index}>{citation.citation}</p>
        ))}
      <h6>Reviews:</h6>
      {item.reviews &&
        item.reviews.map((review, index) => (
          <div key={index}>
            <p>Rating: {review.rating}</p>
            <p>{review.review}</p>
          </div>
        ))}
    </div>
  );
};

export default BookDetails;
