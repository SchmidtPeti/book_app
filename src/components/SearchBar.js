// src/components/SearchBar.js
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
  const allBooks = useMemo(
    () => [
      ...ifj_irodalom,
      ...kotelezo_olvasmany,
      ...magyar_szepirodalom,
      ...regeny,
      ...vilagirodalom,
    ],
    []
  );

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
          placeholder="Search here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary ms-2" onClick={handleSearch}>
          Search
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
                {suggestion.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
  
  
  
};

export default SearchBar;
