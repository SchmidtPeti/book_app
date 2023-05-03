import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import backgroundimage from '../assets/background_homepage.webp';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
  background-image: url("${backgroundimage}");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Content = styled.div`
  text-align: center;
  background-color: rgba(255, 255, 255, 0.85);
  padding: 2rem;
  border-radius: 4px;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  background-color: #007bff;
  color: white;
  font-weight: bold;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin: 0 0.5rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0069d9;
  }
`;

const HomePage = () => {
  return (
    <Container>
      <Content>
        <h2>Melyik úton induljunk el?</h2>
        <div className="mt-4">
          <StyledLink to="/book-search">Könyvkeresés</StyledLink>
          <StyledLink to="/book-recommendation">Könyvajánló</StyledLink>
        </div>
      </Content>
    </Container>
  );
};

export default HomePage;
