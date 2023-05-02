import React from 'react';
import { render, screen, fireEvent, waitFor, prettyDOM } from '@testing-library/react';
import BookCard from '../components/book/BookCard';

import { AppContextProvider } from '../context/AppContext';
import { AuthProvider } from '../context/AuthContext';
import { BooksProvider } from '../context/BooksContext';
import { ScheduledBooksProvider } from '../context/ScheduledBooksContext';
import '@testing-library/jest-dom';


const currentUser = {
  uid: 'test-user',
};

const mockItem = {
  cover: 'test-cover.jpg',
  title: 'Test Book Title',
  score: 8.5,
  categories: ['Fiction', 'Mystery'],
  editions: [
    { pages: 320 },
    { pages: 350 },
  ],
  reviews: [
    { rating: 4 },
    { rating: 5 },
  ],
  quotes: [
    'Test quote 1',
    'Test quote 2',
  ],
  description: 'Test book description',
};

describe('BookCard', () => {
  test('renders book card with correct details', () => {
    render(
      <AuthProvider>
        <AppContextProvider>
          <BooksProvider>
            <ScheduledBooksProvider>
              <BookCard item={mockItem} loadingCitatum={false} loadingMoly={false} />
            </ScheduledBooksProvider>
          </BooksProvider>
        </AppContextProvider>
      </AuthProvider>
    );

    expect(screen.getByText('Test Book Title')).toBeInTheDocument();
    expect(screen.getByText('Score: 8.5')).toBeInTheDocument();
    expect(screen.getByText('Fiction')).toBeInTheDocument();
    expect(screen.getByText('Mystery')).toBeInTheDocument();
    expect(screen.getByText('Average page: 335')).toBeInTheDocument();
    expect(screen.getByText('Test book description')).toBeInTheDocument();
  });
  
  
});
