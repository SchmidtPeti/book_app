import axios from 'axios';
import { parseQuoteResponse } from './parser';


export const getQuote = async (konyv) => {
    const apiUrl = 'https://citatum-api.herokuapp.com/idezet.php';
    const params = {
      konyv:konyv,
      f: 'Mondvanolvaso',
      j: 'c53d6e70479b94bf1d1a4bc872eb2bd7',
      db: 5
    };
  
    try {
      const urlWithParams = new URL(apiUrl, window.location.origin);
      Object.entries(params).forEach(([key, value]) =>
        urlWithParams.searchParams.append(key, value)
      );
    
      // Log the full URL
      console.log('URL sent to the API:', urlWithParams.href);
      const response = await axios.get(apiUrl, { params: params });
      const idezetek = parseQuoteResponse(response.data);
      console.log("idezetek",idezetek)
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

    const mainBooks = [];

    for (const book of data.books) {
      const quotes = await getQuote(book.title);

      if (quotes.length > 0) {
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

        const bookEditionsResponse = await fetch(
          `https://moly.hu/api/book_editions/${book.id}.json?key=82bcbc88494e224498b951657083bb4d`
        );
        const bookEditionsData = await bookEditionsResponse.json();

        mainBooks.push({
          id: book.id,
          author: book.author,
          title: book.title,
          cover: bookDetailsData.book.cover,
          description: bookDetailsData.book.description,
          url: bookDetailsData.book.url,
          citations: bookCitationsData.citations,
          reviews: bookReviewsData.reviews,
          editions: bookEditionsData.editions,
          quotes: quotes,
        });
      }
    }

    return mainBooks;
  } catch (error) {
    console.error("Error fetching Moly.hu data:", error);
    return [];
  }
};
