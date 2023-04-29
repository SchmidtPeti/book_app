import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

const CustomNavbar = () => {
  const { currentUser } = useContext(AuthContext);

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {currentUser ? (
              <>
                <Nav.Link as={Link} to="/book-search">
                  Book Search
                </Nav.Link>
                <Nav.Link as={Link} to="/book-recommendation">
                  Book Recommendation
                </Nav.Link>
                <NavDropdown
                  title={currentUser.displayName || currentUser.email}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item as={Link} to="/my-books">
                    My Books
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
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
  