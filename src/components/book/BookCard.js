import React, { useState, useContext } from 'react';
import BookCover from './BookCover';
import BookHeader from './BookHeader';
import BookCitations from './BookCitations';
import BookQuotes from './BookQuotes';
import BookEditions from './BookEditions';
import BookReviews from './BookReviews';
import { AuthContext } from "../../context/AuthContext";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const BookCard = ({ item, loadingCitatum, loadingMoly }) => {
  const [openSections, setOpenSections] = useState({});
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

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
  
  const handleAddButtonClick = async () => {
    const db = getFirestore();
    const userBooksRef = collection(db, "books", currentUser.uid, "userBooks");
    const bookData = {
      title: item.title,
      pageCount: 0,
      averagePage: calculateAveragePage(item.editions),
      addedAt: serverTimestamp()
    };

    try {
      const docRef = await addDoc(userBooksRef, bookData);
      console.log("Book added with ID:", docRef.id);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div className="card mb-3 card-item">
      <div className="row g-0">
        <div className="col-md-4">
          <BookCover cover={item.cover} title={item.title} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            {currentUser && (
              <button
                className="btn btn-success mb-3 float-end"
                onClick={handleAddButtonClick}
              >
                Add
              </button>
            )}
            <BookHeader item={item} loadingMoly={loadingMoly} />
            <div>Score: {item.score}</div>
            <div>
                {item.categories.length > 0 &&
                  item.categories.map((category, index) => (
                    <span key={index} className="badge bg-secondary me-2">
                      {category}
                    </span>
                  ))}
            </div>      
            <div>Average page: {calculateAveragePage(item.editions)}</div>
            <div className="mt-3">{item.description}</div>
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

