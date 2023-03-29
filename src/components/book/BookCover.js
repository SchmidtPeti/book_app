import React from 'react';

const BookCover = ({ cover, title }) => (
  <img src={cover} alt={title} className="img-fluid" />
);

export default BookCover;
