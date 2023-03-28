import axios from 'axios';
import { parseQuoteResponse } from './parser';

export const searchGoogleBooks = async (title) => {
    const apiKey = 'AIzaSyDiwFBQOy1taS92EVFPIlV8o8x8GZvSPGI';
    const apiUrl = 'https://www.googleapis.com/books/v1/volumes';
  
    try {
      const response = await axios.get(apiUrl, {
        params: {
          q: title,
          key: apiKey,
          maxResults: 1,
          orderBy: "newest",
        },
      });
  
      const items = response.data.items;
      console.log(items);
  
      if (items && items.length > 0) {
        const thumbnailUrl = items[0].volumeInfo.imageLinks.thumbnail;
        return thumbnailUrl;
      } else {
        console.log('No results found.');
      }
    } catch (error) {
      console.error('Error searching Google Books:', error);
    }
    return null;
};

export const getQuote = async (konyv) => {
    const apiUrl = '/idezet.php';
    const params = {
      konyv: konyv,
      f: 'Mondvanolvaso',
      j: 'c53d6e70479b94bf1d1a4bc872eb2bd7',
      db: 5
    };
  
    try {
      const response = await axios.get(apiUrl, { params: params });
      const idezetek = parseQuoteResponse(response.data);
      return idezetek; // Return the full array of quotes
    } catch (error) {
      console.error('Error fetching quote:', error);
      return []; // Return an empty array if there's an error
    }
};
export const searchMolyBooks = async (searchTerm) => {
    const apiUrl = 'https://moly.hu/api/books.json';
    const params = {
      q: searchTerm,
      key: '82bcbc88494e224498b951657083bb4d',
    };
  
    try {
      const response = await axios.get(apiUrl, { params: params });
      return response.data.books;
    } catch (error) {
      console.error('Error fetching books:', error);
      return [];
    }
  };

// Add more functions as needed...
