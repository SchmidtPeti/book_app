import '@testing-library/jest-dom';
import { getQuote, searchMolyBooks } from './utils/api';
import axios from 'axios';

jest.mock('axios');

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ books: [] }),
  })
);
describe('API functions', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('getQuote should return an array of quotes', async () => {
      axios.get.mockResolvedValue({ data: 'Sample response data' });
  
      const result = await getQuote('tüskevár');
      expect(axios.get).toHaveBeenCalled();
      // You can add more assertions here based on the expected structure of the response
    });
  
    it('searchMolyBooks should return an array of main books', async () => {
      global.fetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve({ books: [{ title: 'Sample Book Title', id: 1, author: 'Sample Author' }] }),
        })
      );
  
      const result = await searchMolyBooks('tüskevár');
      expect(fetch).toHaveBeenCalled();
      // You can add more assertions here based on the expected structure of the response
    });
  });
  
