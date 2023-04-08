import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <nav>
      {currentUser ? (
        <>
          <Link to="/">Home</Link>
          <Link to="/book-search">Book Search</Link>
          <Link to="/book-recommendation">Book Recommendation</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
