import React from 'react';

const BookReviews = ({ reviews }) => {
  return (
    <div className="mt-3">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Rating</th>
            <th scope="col">Review</th>
          </tr>
        </thead>
        <tbody>
          {reviews &&
            reviews.map((review, index) => (
              <tr key={index}>
                <td>{review.rating}</td>
                <td>{review.review}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookReviews;
