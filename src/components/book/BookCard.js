import React, { useState } from 'react';
import BookCover from './BookCover';
import BookHeader from './BookHeader';
import BookDetails from './BookDetails';
import BookQuotes from './BookQuotes';

const BookCard = ({ item, loadingCitatum, loadingMoly }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="card mb-3 card-item">
      <div className="row g-0">
        <div className="col-md-4">
          <BookCover cover={item.cover} title={item.title} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <BookHeader item={item} loadingMoly={loadingMoly} />
            <button
              className="btn btn-primary"
              type="button"
              onClick={toggle}
            >
              {isOpen ? 'Hide Details' : 'Show Details'}
            </button>
            {isOpen && <BookDetails item={item} />}
            <BookQuotes loadingCitatum={loadingCitatum} quotes={item.quotes} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
