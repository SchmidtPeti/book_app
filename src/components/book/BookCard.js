import React, { useState } from 'react';
import BookCover from './BookCover';
import BookHeader from './BookHeader';
import BookCitations from './BookCitations';
import BookQuotes from './BookQuotes';
import BookEditions from './BookEditions';
import BookReviews from './BookReviews';

const BookCard = ({ item, loadingCitatum, loadingMoly }) => {
  const [openSections, setOpenSections] = useState({});
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const toggleDetails = () => setIsDetailsOpen(!isDetailsOpen);

  const toggleSection = (section) =>
    setOpenSections({ ...openSections, [section]: !openSections[section] });

  const calculateAveragePage = (editions) => {
    let total = 0;
    editions.forEach((edition) => {
      total += edition.pages;
    });
    return Math.round(total / editions.length);
  };

  return (
    <div className="card mb-3 card-item">
      <div className="row g-0">
        <div className="col-md-4">
          <BookCover cover={item.cover} title={item.title} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <BookHeader item={item} loadingMoly={loadingMoly} />
            <div className="mt-3">{item.description}</div>
            <div>Score: {item.score}</div>
            <div>Average page: {calculateAveragePage(item.editions)}</div>
            <button
              className="btn btn-primary w-100 my-2"
              type="button"
              onClick={() => toggleSection('quotes')}
            >
              {openSections.quotes ? 'Hide Quotes' : 'Show Quotes'}
            </button>
            {openSections.quotes && (
              <BookQuotes
                loadingCitatum={loadingCitatum}
                quotes={item.quotes}
              />
            )}
            <button
              className="btn btn-primary w-100 my-2"
              type="button"
              onClick={toggleDetails}
            >
              {isDetailsOpen ? 'Hide Citations' : 'Show Citations'}
            </button>
            {isDetailsOpen && <BookCitations item={item} />}
            <button
              className="btn btn-primary w-100 my-2"
              type="button"
              onClick={() => toggleSection('editions')}
            >
              {openSections.editions ? 'Hide Editions' : 'Show Editions'}
            </button>
            {openSections.editions && (
              <BookEditions editions={item.editions} />
            )}
            <button
              className="btn btn-primary w-100 my-2"
              type="button"
              onClick={() => toggleSection('reviews')}
            >
              {openSections.reviews ? 'Hide Reviews' : 'Show Reviews'}
            </button>
            {openSections.reviews && <BookReviews reviews={item.reviews} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;

