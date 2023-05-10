import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import styled from "styled-components";
import { Navbar, Nav, Container } from "react-bootstrap"; // Import the necessary components from react-bootstrap

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

const CustomNavbar = () => {
  const { currentUser } = useContext(AuthContext);

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      style={{ boxShadow: "0 2px 2px rgba(0, 0, 0, 0.1)" }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          Kezdőlap
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {currentUser ? (
              <>
                <Nav.Link as={NavLink} to="/book-search">
                  Könyvkeresés
                </Nav.Link>
                <Nav.Link as={NavLink} to="/book-recommendation">
                  Könyvajánló
                </Nav.Link>
                <Nav.Link as={NavLink} to="/my-books">
                  Saját könyveim
                </Nav.Link>
                <Nav.Link as={NavLink} onClick={handleLogout}>
                  Kijelentkezés
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">
                  Bejelentkezés
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register">
                  Regisztráció
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
