// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h2>Which route shall we go down?</h2>
        <div className="mt-4">
          <Link to="/book-search" className="btn btn-primary me-3">
            Book Search
          </Link>
          <Link to="/book-recommendation" className="btn btn-primary">
            Book Recommendation
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
