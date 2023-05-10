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
            <div class="card">
      <div class="card-header">
        Könyvek értékelési módszere
      </div>
      <div class="card-body">
        <p class="card-text">A könyvek értékelését a következő módon számoltuk ki:</p>
        <ul>
          <li>Meghatároztuk a kedveltPart értékét, amely a kedvelt címkéjű idézetek arányát számolja, amelyeknek a kedvelt értéke legalább 10.</li>
          <li>Kiszámoltuk az átlagos oldalszámot a könyv összes kiadásához, és ezt az averagePages változóban tároltuk.</li>
          <li>Összegyűjtöttük a hivatkozások és idézetek szövegét, valamint a szavak számát, és eltároltuk őket a wordCountsArray tömbben. Ezután létrehoztunk egy szűrt tömböt, amely csak azokat a hivatkozásokat és idézeteket tartalmazza, amelyek szavainak száma a minWordPerQuote és a maxWordPerQuote között van.</li>
          <li>Kiszámoltuk a quoteWordNumberScore értékét, amely a szűrt tömb hossza és a wordCountsArray tömb hossza arányát jelenti.</li>
          <li>Kiszámoltuk a pageScore értékét, amely az átlagos oldalszám és a legjobb oldalszám (ami jelen esetben 200) arányát jelenti, legfeljebb 1 értékig.</li>
          <li>Végül kiszámoltuk a végső értékelést, amely a fenti három érték átlagát képezi, szorozva 100-al, hogy a végeredmény 100-as skálán jelenjen meg. A végső értékelést két tizedesjegyre kerekítettük.</li>
        </ul>
        <p class="card-text">Fontos megjegyezni, hogy a legjobb oldalszám (200), a minimális és maximális szavak száma idézetenként (10 és 25) és a kedvelt értékek küszöbértéke (10) a kódban vannak rögzítve. Ezek a számok változtathatók, hogy jobban illeszkedjenek a felhasználó preferenciáihoz vagy a könyvek értékelési kritériumaihoz.</p>
      </div>
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
              {openSections.quotes ? 'Citatum.hu idézetek elrejtése' : 'Citatum.hu idézetek megjelenítése'}
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
              {isDetailsOpen ? 'Moly.hu idézetek elrejtése' : 'Moly.hu idézetek megjelenítése'}
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


