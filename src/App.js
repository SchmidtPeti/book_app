import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { searchGoogleBooks, getQuote, searchMolyBooks } from './utils/api';
import SearchBar from './components/SearchBar';
import BookCards from './components/BookCards';
import AppContext from './AppContext';
import useLoadingStates from './useLoadingStates';




function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    loadingCitatum,
    setLoadingCitatum,
    loadingMoly,
    setLoadingMoly,
    loadingGoogleBooks,
    setLoadingGoogleBooks,
  } = useLoadingStates();

  
  const handleSearch = async () => {
    setLoading(true);
  
    const quotesPromise = getQuote(searchTerm).then((quotes) => {
      setLoadingCitatum(false);
      return quotes;
    });
  
    const thumbnailPromise = searchGoogleBooks(searchTerm).then((thumbnail) => {
      setLoadingGoogleBooks(false);
      return thumbnail;
    });
  
    const booksPromise = searchMolyBooks(searchTerm).then((books) => {
      setLoadingMoly(false);
      return books;
    });
  
    const [quotes, thumbnail, books] = await Promise.all([
      quotesPromise,
      thumbnailPromise,
      booksPromise,
    ]);
  
    const bookData = [];
  
    for (const book of books) {
      bookData.push({
        id: book.id,
        title: `${book.title} by ${book.author}`,
        image: thumbnail,
        quotes: quotes,
        score: 0, // Replace this with the actual score if available
      });
    }
  
    setData(bookData);
    setLoading(false);
  };
  
  return (
    <AppContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        handleSearch,
        data,
        loading,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="mt-4">Könyv ajánlás</h1>
          </div>
          <SearchBar />
        </div>
        <BookCards
          data={data}
          loading={loading}
          loadingCitatum={loadingCitatum}
          loadingMoly={loadingMoly}
          loadingGoogleBooks={loadingGoogleBooks}
        />
      </div>
    </AppContext.Provider>
  );  

}

export default App;
