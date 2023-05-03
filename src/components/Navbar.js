import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import styled from "styled-components";

const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: linear-gradient(120deg, #5daa8a 0%, #4d96ba 100%);
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 0 0.5rem;
  font-weight: bold;
  transition: color 0.2s;

  &:hover {
    color: #e5e5e5;
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
`;

const CustomNavbar = () => {
  const { currentUser } = useContext(AuthContext);

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <NavWrapper>
      <NavLink to="/">Kezdőlap</NavLink>
      <NavMenu>
        {currentUser ? (
          <>
            <NavLink to="/book-search">Könyvkeresés</NavLink>
            <NavLink to="/book-recommendation">Könyvajánló</NavLink>
            <NavLink to="/my-books">Saját könyveim</NavLink>
            <NavLink onClick={handleLogout}>Kijelentkezés</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login">Bejelentkezés</NavLink>
            <NavLink to="/register">Regisztráció</NavLink>
          </>
        )}
      </NavMenu>
    </NavWrapper>
  );
};

export default CustomNavbar;
