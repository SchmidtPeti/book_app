import React, { useState, useEffect,useMemo  } from 'react';
import { useAppContext } from '../context/AppContext';
import { getQuote } from '../utils/api';
import { ifj_irodalom } from '../data/ifj_irodalom';
import { kotelezo_olvasmany } from '../data/kotelezo_olvasmany';
import { magyar_szepirodalom } from '../data/magyar_szepirodalom';
import { regeny } from '../data/regeny';
import { vilagirodalom } from '../data/vilagirodalom';
import { fetchBooks } from '../utils/fetchBooks';

const SearchBar = () => {
  const {
    searchTerm,
    setSearchTerm,
    updateData,
    setLoading,
    setnotFoundSearch
  } = useAppContext();
  const [suggestions, setSuggestions] = useState([]);
  const allBooks = useMemo(() => {
    // Merge the arrays
    const mergedBooks = [
      ...ifj_irodalom,
      ...kotelezo_olvasmany,
      ...magyar_szepirodalom,
      ...regeny,
      ...vilagirodalom,
    ];
  
    // Create a Set to keep track of unique titles
    const uniqueTitles = new Set();
  
    // Filter the mergedBooks array to include only books with unique titles
    const uniqueBooks = mergedBooks.filter((book) => {
      // Check if the title is already in the Set
      if (uniqueTitles.has(book.title)) {
        // If the title is already in the Set, exclude the book from the result
        return false;
      } else {
        // If the title is not in the Set, add it to the Set and include the book in the result
        uniqueTitles.add(book.title);
        return true;
      }
    });
  
    return uniqueBooks;
  }, []);
  
  

  useEffect(() => {
    const generateSuggestions = (inputText) => {
      const filteredSuggestions = allBooks.filter((book) =>
        book.title.toLowerCase().includes(inputText.toLowerCase()) && book.title.toLowerCase() !== inputText.toLowerCase()
      );
      setSuggestions(filteredSuggestions.slice(0, 5)); // Limit the number of suggestions (e.g., 5)
    };

    if (searchTerm.length >= 3) {
      generateSuggestions(searchTerm);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, allBooks]);

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.title);
    setSuggestions([]);
  };

  const handleSearch = async () => {
    setLoading(true);
  
    const quotes = await getQuote(searchTerm);
  
    if (quotes.length > 0) {
      const firstQuote = [quotes[0]];
  
      const bookData = await fetchBooks(firstQuote);
  
      updateData(bookData);
      setLoading(false);
      setnotFoundSearch(false); // Set notFoundSearch to false when quotes are found
    } else {
      updateData([]);
      setLoading(false);
      setnotFoundSearch(true); // Set notFoundSearch to true when quotes are not found
    }
  };
  
  

  return (
    <>
      <div className="col-12 d-flex justify-content-center position-relative">
        <input
          type="text"
          className="form-control"
          id="search-input"
          placeholder="Próbáljon nagyobb művek címével keresni! például A vörös és a fekete, A kőszívű ember fiai, A Pál utcai fiúk, A kis herceg, A Gyűrűk Ura..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary ms-2" onClick={handleSearch}>
          Keresés
        </button>
        {suggestions.length > 0 && (
          <div
            className="suggestions"
            style={{
              position: 'absolute', 
              zIndex: 1,
              width: '100%',
              backgroundColor: 'white',
              borderRadius: '0 0 5px 5px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              marginTop: '38px',
            }}
          >
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="suggestion"
                tabIndex={0}
                style={{
                  padding: '10px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #eee',
                }}
                onMouseDown={() => handleSuggestionClick(suggestion)}
                onFocus={() => handleSuggestionClick(suggestion)}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#eee')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
              >
              <div>
                {suggestion.title}
              </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
  
  
  
};

export default SearchBar;
