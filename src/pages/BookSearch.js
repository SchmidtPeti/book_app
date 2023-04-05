import React from 'react';
import SearchBar from '../components/SearchBar';
import BookCards from '../components/book/BookCards'

const BookSearch = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h1 className="mt-4">Könyv keresés</h1>
        </div>
        <SearchBar />
        <BookCards />
      </div>
    </div>
  );
};

export default BookSearch;
