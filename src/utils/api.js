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
  try {
    const response = await fetch(
      `https://moly.hu/api/books.json?q=${encodeURIComponent(
        searchTerm
      )}&key=82bcbc88494e224498b951657083bb4d`
    );
    const data = await response.json();

    const booksDataPromises = data.books.map(async (book) => {
      const bookDetailsResponse = await fetch(
        `https://moly.hu/api/book/${book.id}.json?key=82bcbc88494e224498b951657083bb4d`
      );
      const bookDetailsData = await bookDetailsResponse.json();

      const bookCitationsResponse = await fetch(
        `https://moly.hu/api/book_citations/${book.id}.json?key=82bcbc88494e224498b951657083bb4d`
      );
      const bookCitationsData = await bookCitationsResponse.json();

      const bookReviewsResponse = await fetch(
        `https://moly.hu/api/book_reviews/${book.id}.json?key=82bcbc88494e224498b951657083bb4d`
      );
      const bookReviewsData = await bookReviewsResponse.json();

      return {
        id: book.id,
        author: book.author,
        title: book.title,
        cover: bookDetailsData.book.cover,
        description: bookDetailsData.book.description,
        url: bookDetailsData.book.url,
        citations: bookCitationsData.citations,
        reviews: bookReviewsData.reviews,
      };
    });

    const booksData = await Promise.all(booksDataPromises);
    return booksData;
  } catch (error) {
    console.error("Error fetching Moly.hu data:", error);
    return [];
  }
};


// Add more functions as needed...
