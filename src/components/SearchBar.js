// src/components/SearchBar.js
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { searchGoogleBooks, getQuote, searchMolyBooks } from '../utils/api';

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
  
    const thumbnailPromise = searchGoogleBooks(searchTerm).then((thumbnail) => {
      return thumbnail;
    });
  
    const booksPromise = searchMolyBooks(searchTerm).then((books) => {
      return books;
    });
  
    const [quotes, thumbnail, books] = await Promise.all([
      quotesPromise,
      thumbnailPromise,
      booksPromise,
    ]);
    console.log(quotes)
    console.log(thumbnail)
    console.log(books)
  
    const bookData = [];
  
    for (const book of books) {
      bookData.push({
        id: book.id,
        title: `${book.title} by ${book.author}`,
        image: thumbnail,
        quotes: quotes,
        score: 0,
        author: book.author, // Add this line
        cover: book.cover, // Add this line
        description: book.description, // Add this line
        url: book.url, // Add this line
        citations: book.citations, // Add this line
        reviews: book.reviews, // Add this line
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
