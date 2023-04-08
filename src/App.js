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
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <AppContextProvider>
        <LoadingProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/book-search" element={<BookSearch />} />
              <Route path="/book-recommendation" element={<BookRecommendation />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
            <BackToHomeButton />
          </Router>
        </LoadingProvider>
      </AppContextProvider>
    </AuthProvider>
  );
}

export default App;
