import React, { useState, useContext, useEffect } from 'react';
import BookCover from './BookCover';
import BookHeader from './BookHeader';
import BookCitations from './BookCitations';
import BookQuotes from './BookQuotes';
import BookEditions from './BookEditions';
import BookReviews from './BookReviews';
import { AuthContext } from "../../context/AuthContext";
import { getFirestore, collection, addDoc, serverTimestamp,query,where,getDocs } from "firebase/firestore";
import styled from 'styled-components';

const StyledCard = styled.div`
  margin-bottom: 1rem;
`;

const StyledCardBody = styled.div`
  padding: 1rem;
`;

const StyledButton = styled.button`
  width: 100%;
  margin: 1rem 0;
`;

const BookCard = ({ item, loadingCitatum, loadingMoly }) => {
  const [openSections, setOpenSections] = useState({});
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [isBookAdded, setIsBookAdded] = useState(false);
  const toggleDetails = () => setIsDetailsOpen(!isDetailsOpen);
  const [isScoreCalculationOpen, setIsScoreCalculationOpen] = useState(false);
  const toggleScoreCalculation = () => {
    setIsScoreCalculationOpen(!isScoreCalculationOpen);
  };
  console.log("sorry my little boy, but this is the end", item);

  useEffect(() => {
    const checkIfBookAdded = async () => {
      try {
        const db = getFirestore();
        const userBooksRef = collection(db, "books", currentUser.uid, "userBooks");
        const bookQuery = query(userBooksRef, where("title", "==", item.title));
        const querySnapshot = await getDocs(bookQuery);
  
        if (!querySnapshot.empty) {
          setIsBookAdded(true);
        } else {
          setIsBookAdded(false);
        }
      } catch (error) {
        console.error("Error checking if book is added:", error);
      }
    };
    if (currentUser) {
      checkIfBookAdded();
    }
  }, [currentUser, item]);
  
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
      setIsBookAdded(true); 
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <StyledCard className="card mb-3 card-item">
      <div className="row g-0">
        <div className="col-md-4">
          <BookCover cover={item.cover} title={item.title} />
        </div>
        <div className="col-md-8">
          <StyledCardBody className="card-body">
                    {currentUser && (
            <button
              className="btn btn-success mb-3 float-end"
              onClick={handleAddButtonClick}
              disabled={isBookAdded} 
            >
              {isBookAdded ? "Hozzáadva" : "Hozzáadás"}
            </button>
          )}
            <BookHeader item={item} loadingMoly={loadingMoly} />
            <div>Értékelés: {item.score}</div>
                        {/* Add a button to toggle the score calculation explanation */}
                        <button
              className="btn btn-link text-decoration-none p-0"
              type="button"
              onClick={toggleScoreCalculation}
            >
              Hogyan számoltam ki ezt?
            </button>
            <div className={`collapse ${isScoreCalculationOpen ? 'show' : ''}`}>
              <div className="card card-body">
                Az értékelés az alábbi súlyozott tényezők alapján kerül kiszámításra:
                <ul>
                </ul>
                A súlyozott értékek összege adja a végső értékelést.
              </div>
            </div>
            <div>
                {item.categories && item.categories.length > 0 &&
                  item.categories.map((category, index) => (
                    <span key={index} className="badge bg-secondary me-2">
                      {category}
                    </span>
                  ))}
            </div>      
            <div>Átlagos oldalszám: {calculateAveragePage(item.editions)}</div>
            <div className="mt-3">{item.description}</div>
            <StyledButton
              className="btn btn-primary"
              type="button"
              onClick={() => toggleSection('quotes')}
            >
              {openSections.quotes ? 'Idézetek elrejtése' : 'Idézetek megjelenítése'}
            </StyledButton>
            {openSections.quotes && (
              <BookQuotes
                loadingCitatum={loadingCitatum}
                quotes={item.quotes}
              />
            )}
            <StyledButton
              className="btn btn-primary"
              type="button"
              onClick={toggleDetails}
            >
              {isDetailsOpen ? 'Hivatkozások elrejtése' : 'Hivatkozások megjelenítése'}
            </StyledButton>
            {isDetailsOpen && <BookCitations item={item} />}
            <StyledButton
              className="btn btn-primary"
              type="button"
              onClick={() => toggleSection('editions')}
            >
              {openSections.editions ? 'Kiadások elrejtése' : 'Kiadások megjelenítése'}
            </StyledButton>
            {openSections.editions && (
              <BookEditions editions={item.editions} />
            )}
            <StyledButton
              className="btn btn-primary"
              type="button"
              onClick={() => toggleSection('reviews')}
            >
              {openSections.reviews ? 'Vélemények elrejtése' : 'Vélemények megjelenítése'}
            </StyledButton>
            {openSections.reviews && <BookReviews reviews={item.reviews} />}
          </StyledCardBody>
        </div>
      </div>
    </StyledCard>
  );
};

export default BookCard;


