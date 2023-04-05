import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BackToHomeButton = () => {
  const location = useLocation();

  if (location.pathname === '/') {
    return null;
  }

  return (
    <div className="fixed-bottom mb-3 me-3" style={{ textAlign: 'right' }}>
      <Link to="/" className="btn btn-secondary">
        Back to Home
      </Link>
    </div>
  );
};

export default BackToHomeButton;
