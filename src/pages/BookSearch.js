import React from 'react';
import SearchBar from '../components/SearchBar';
import BookCards from '../components/book/BookCards';
import PageHeader from '../components/PageHeader';

const BookSearch = () => {
  return (
    <div className="container">
      <PageHeader title={'Book Search'}/>
      <div className="row">
        <SearchBar />
        <BookCards />
      </div>
    </div>
  );
};

export default BookSearch;
