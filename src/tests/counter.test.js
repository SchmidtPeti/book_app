import { render, screen, fireEvent } from '@testing-library/react';
import Counter from '../counter';
import '@testing-library/jest-dom/extend-expect';


test('renders Counter component', () => {
    render(<Counter />);
    const counterElement = screen.getByText(/count:/i);
    expect(counterElement).toBeInTheDocument();
  });
  
  test('increments count when button is clicked', () => {
    render(<Counter />);
    const buttonElement = screen.getByText(/increment/i);
    const counterElement = screen.getByText(/count: 0/i);
    
    // Store the initial text content of the counter element
    const initialTextContent = counterElement.textContent;
    
    fireEvent.click(buttonElement);
    
    // Check if the counter element's text content has been updated
    expect(counterElement.textContent).not.toBe(initialTextContent);
    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
  });
  