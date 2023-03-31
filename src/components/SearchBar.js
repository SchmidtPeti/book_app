// src/components/SearchBar.js
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { getQuote, searchMolyBooks } from '../utils/api';

const SearchBar = () => {
  const {
    searchTerm,
    setSearchTerm,
    updateData,
    setLoading,
  } = useAppContext();

  const handleSearch = async () => {
    setLoading(true);
  
    const quotesPromise = getQuote(searchTerm).then((quotes) => {
      return quotes;
    });
  
    /*const thumbnailPromise = searchGoogleBooks(searchTerm).then((thumbnail) => {
      return thumbnail;
    });*/
  
    const booksPromise = searchMolyBooks(searchTerm).then((books) => {
      return books;
    });
  
    const [quotes, books] = await Promise.all([
      quotesPromise,
      booksPromise,
    ]);
  
    const bookData = [];
  
    for (const book of books) {
      bookData.push({
        id: book.id,
        title: `${book.title} by ${book.author}`,
        quotes: quotes,
        score: 0,
        author: book.author,
        cover: book.cover,
        description: book.description,
        url: book.url,
        citations: book.citations,
        reviews: book.reviews,
        editions: book.editions, // Add this line
      });
    }
  
    updateData(bookData);
    setLoading(false);
  };
  

  return (
    <>
      <div className="col-12 d-flex justify-content-center">
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
      </div>
    </>
  );
};

export default SearchBar;
