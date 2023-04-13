import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#3f7cac" }}>
      <div className="container">
        {currentUser ? (
          <>
            <Link className="navbar-brand" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/book-search">
              Book Search
            </Link>
            <Link className="nav-link" to="/book-recommendation">
              Book Recommendation
            </Link>
            <div className="dropdown">
              <button
                className="btn btn-outline-light dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {currentUser.displayName || currentUser.email}
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link className="nav-link" to="/login">
              Login
            </Link>
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
