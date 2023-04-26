import { render, screen, fireEvent, act } from '@testing-library/react';
import { AppContext } from '../context/AppContext'; // Update the import here
import SearchBar from '../components/SearchBar';

const renderSearchBar = () => {
  return render(
    <AppContext.Provider>
      <SearchBar />
    </AppContext.Provider>
  );
};

test('renders SearchBar component', () => {
  renderSearchBar();
  const inputElement = screen.getByPlaceholderText(/search here/i);
  expect(inputElement).toBeInTheDocument();
});

test('updates search term on input change', async () => {
  renderSearchBar();
  const inputElement = screen.getByPlaceholderText(/search here/i);

  fireEvent.change(inputElement, { target: { value: 'test' } });
  expect(inputElement.value).toBe('test');
});

test('shows suggestions when search term has at least 3 characters', async () => {
  renderSearchBar();
  const inputElement = screen.getByPlaceholderText(/search here/i);

  // Enter a search term with 3 characters
  fireEvent.change(inputElement, { target: { value: 'abc' } });

  // Since suggestions are generated asynchronously, we need to wait for the suggestions to be rendered
  await act(async () => {
    const suggestions = await screen.findAllByRole('suggestion');
    expect(suggestions.length).toBeGreaterThanOrEqual(1);
  });
});
