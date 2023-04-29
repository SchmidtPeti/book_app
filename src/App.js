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
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import MyBooks from './pages/MyBooks';
import AddBook from './pages/AddBook';
import { BooksProvider } from './context/BooksContext';
import { ScheduledBooksProvider } from './context/ScheduledBooksContext';

function App() {
  return (
    <AuthProvider>
      <AppContextProvider>
      <BooksProvider>
        <ScheduledBooksProvider>
        <LoadingProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/book-search" element={<BookSearch />} />
              <Route path="/book-recommendation" element={<BookRecommendation />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/my-books" element={<MyBooks />} />
              <Route path="/my-books/add" element={<AddBook />} />
              <Route path="/*" element={<App />} />
            </Routes>
            <BackToHomeButton />
          </Router>
        </LoadingProvider>
        </ScheduledBooksProvider>
      </BooksProvider>
      </AppContextProvider>
    </AuthProvider>
  );
}

export default App;
