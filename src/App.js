// App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookSearch from './pages/BookSearch';
import BookRecommendation from './pages/BookRecommendation';
import { AppContextProvider } from './context/AppContext';
import { LoadingProvider } from './context/LoadingContext';
import HomePage from './pages/HomePage';
import BackToHomeButton from './components/BackToHomeButton';

function App() {
  return (
    <AppContextProvider>
      <LoadingProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/book-search" element={<BookSearch />} />
            <Route path="/book-recommendation" element={<BookRecommendation />} />
          </Routes>
          <BackToHomeButton />
        </Router>
      </LoadingProvider>
    </AppContextProvider>
  );
}

export default App;
