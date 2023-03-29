import React from 'react';

const Quote = ({ quote }) => (
  <div className="card-text mb-3">
    <blockquote className="blockquote">
      <p>{quote.idezetszoveg}</p>
      <footer className="blockquote-footer">{quote.szerzo}</footer>
    </blockquote>
  </div>
);

export default Quote;
