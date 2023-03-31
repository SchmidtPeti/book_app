import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SearchBar from './components/SearchBar';
import BookCards from './components/book/BookCards';
import { AppContextProvider } from './context/AppContext';
import { LoadingProvider } from './context/LoadingContext';


function App() {
  return (
    <AppContextProvider>
            <LoadingProvider>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="mt-4">Könyv keresés</h1>
          </div>
          <SearchBar />
          <BookCards />
        </div>
      </div>
            </LoadingProvider>
    </AppContextProvider>
  );
}

export default App;
