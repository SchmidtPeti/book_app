import axios from 'axios';
import { parseQuoteResponse } from './parser';


export const getQuote = async (konyv) => {
  const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/idezet.php`;
  const params = {
    //convert name to ascii to avoid encoding issues
    konyv: konyv,
    f: process.env.REACT_APP_IDEZET_API_F,
    j: process.env.REACT_APP_IDEZET_API_J,
    db: 5,
    rendez: "kedvencek",
    honnan: 0,
    rendez_ir: 1,
  };
  console.log("Könyv", konyv);

  try {
    // Create an array of promises for the two requests
    const promises = [0, 5, 10].map((honnan) => {
      // Update the 'honnan' parameter for each request
      params.honnan = honnan;
  
      // Log the full URL
      console.log('URL sent to the API:', apiUrl, params);
      return axios.get(apiUrl, { params: params });
    });
  
    // Execute both requests concurrently and wait for them to resolve
    const responses = await Promise.all(promises);
  
    // Parse the responses and concatenate the results into a single array
    const idezetek = responses.flatMap((response) => parseQuoteResponse(response.data));
  
    console.log("idezetek", idezetek);
    return idezetek; // Return the full array of quotes
  } catch (error) {
    console.error('Error fetching quote:', error);
    return []; // Return an empty array if there's an error
  }
  
};

// Updated checkBooks function
const checkBooks = async (books,forras,szerzo) => {
  for (const book of books) {
    if (
      forras === book.title &&
      szerzo === book.author
    ) {
      return book; // Return the matched book
    }
  }
  return null; // Return null if no match is found
};

// Updated searchMolyBooks function
export const searchMolyBooks = async (forras, szerzo,quotes) => {
  try {
    const response = await fetch(
      `https://moly.hu/api/books.json?q=${encodeURIComponent(
        szerzo + ' ' + forras
      )}&key=${process.env.REACT_APP_MOLY_API_KEY}`
    );
    const data = await response.json();
    console.log("moly back",data)
    
    const matchedBook = await checkBooks(data.books,forras,szerzo);

    if (!matchedBook) {
      return [];
    }

    const bookDetailsResponse = await fetch(
      `https://moly.hu/api/book/${matchedBook.id}.json?key=${process.env.REACT_APP_MOLY_API_KEY}`
    );
    const bookDetailsData = await bookDetailsResponse.json();

    const bookCitationsResponse = await fetch(
      `https://moly.hu/api/book_citations/${matchedBook.id}.json?key=${process.env.REACT_APP_MOLY_API_KEY}`
    );
    const bookCitationsData = await bookCitationsResponse.json();

    const bookReviewsResponse = await fetch(
      `https://moly.hu/api/book_reviews/${matchedBook.id}.json?key=${process.env.REACT_APP_MOLY_API_KEY}`
    );
    const bookReviewsData = await bookReviewsResponse.json();

    const bookEditionsResponse = await fetch(
      `https://moly.hu/api/book_editions/${matchedBook.id}.json?key=${process.env.REACT_APP_MOLY_API_KEY}`
    );
    const bookEditionsData = await bookEditionsResponse.json();

    const mainBook = {
      id: matchedBook.id,
      author: matchedBook.author,
      title: matchedBook.title,
      cover: bookDetailsData.book.cover,
      description: bookDetailsData.book.description,
      url: bookDetailsData.book.url,
      citations: bookCitationsData.citations,
      reviews: bookReviewsData.reviews,
      editions: bookEditionsData.editions,
      categories : [...new Set(quotes.map(quote => quote.kategoria))]
    };

    return [mainBook];
  } catch (error) {
    console.error("Error fetching Moly.hu data:", error);
    return [];
  }
};
export const fetchQuotesByCategory = async (category) => {
  console.log(category);
  const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/idezet.php`;
  const params = {
    f: process.env.REACT_APP_IDEZET_API_F,
    j: process.env.REACT_APP_IDEZET_API_J,
    db: 5,
    kat: category,
    rendez: "kedvencek",
    honnan: 0,
    rendez_ir: 1
  };
  try {
    // Create an array of promises for the five requests  
    const promises = [0, 5, 10].map((honnan) => {
      // Update the 'honnan' parameter for each request
      params.honnan = honnan;

      const urlWithParams = new URL(apiUrl, window.location.origin);
      Object.entries(params).forEach(([key, value]) =>
        urlWithParams.searchParams.append(key, value)
      );

      // Log the full URL
      console.log('URL sent to the API:', urlWithParams.href);
      return axios.get(apiUrl, { params: params });
    });


    // Execute all requests concurrently and wait for them to resolve
    const responses = await Promise.all(promises);

    // Parse the responses and concatenate the results into a single array
    const idezetek = responses.flatMap((response) => parseQuoteResponse(response.data));

    //filter out duplicates from the array with szerzo property
    const uniqueIdezetek = idezetek.filter((v,i,a)=>a.findIndex(t=>(t.forras === v.forras))===i)

    return uniqueIdezetek;
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return [];
  }
};





