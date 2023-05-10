import { searchMolyBooks } from './api';
import { getQuote } from './api';


const calculateBookScore = (obj) => {
  const bestPageNumber = process.env.REACT_APP_BEST_PAGE_NUMBER;
  const minWordPerQuote = process.env.REACT_APP_MIN_WORD_PER_QUOTE;
  const maxWordPerQuote = process.env.REACT_APP_MAX_WORD_PER_QUOTE;
  const atLeastKedvenc = process.env.REACT_APP_AT_LEAST_KEDVENC;
  

  let kedveltQuotesNumbers = [];
  obj.quotes.forEach(quote => {
    kedveltQuotesNumbers.push(quote.kedvenc);
  });

  const kedveltPart = kedveltQuotesNumbers.filter(kedvelt => kedvelt >= atLeastKedvenc).length / kedveltQuotesNumbers.length;


  let totalPages = 0;
  obj.editions.forEach(edition => {
    totalPages += edition.pages;
  });
  
  const averagePages = totalPages / obj.editions.length;

  let wordCountsArray = []
  const citationsAndQuotes = [];
  obj.citations.forEach(citation => {
    citationsAndQuotes.push(citation.citation);
    const wordCount = citation.citation.split(' ').length;
    wordCountsArray.push(wordCount)
  });
  obj.quotes.forEach(quote => {
    citationsAndQuotes.push(quote.idezetszoveg);
    const wordCount = quote.idezetszoveg.split(' ').length;
    wordCountsArray.push(wordCount)
  });
  const filteredWordCountsArray = wordCountsArray.filter(wordCount => wordCount >= minWordPerQuote && wordCount <= maxWordPerQuote);
  
  const quoteWordNumberScore = filteredWordCountsArray.length / wordCountsArray.length;

  const pageScore = Math.min(averagePages / bestPageNumber, 1);

  console.log("pageScore: ", pageScore);
  console.log("quoteWordNumberScore: ", quoteWordNumberScore);
  console.log("kedveltPart: ", kedveltPart);
  const score = ((pageScore + quoteWordNumberScore + kedveltPart) / 3)*100;
  //rough it down to 2 decimals
  console.log("score: ", score);
  return Math.round(score * 100) / 100;
};


export const fetchBooks = async (quotes) => {
  const bookData = [];

  for (const quote of quotes) {
    if (quote.szerzo !== '' && quote.forras !== '') {
     const quoteList = await getQuote(quote.forras);
      const books = await searchMolyBooks(quote.forras, quote.szerzo, quoteList);

      for (const book of books) {
        const newBook = {
          id: book.id,
          title: `${book.title} by ${book.author}`,
          quotes: quoteList,
          score: 0,
          author: book.author,
          cover: book.cover,
          description: book.description,
          url: book.url,
          citations: book.citations,
          reviews: book.reviews,
          editions: book.editions,
          categories: book.categories,
        };
        const score = calculateBookScore(newBook);
        bookData.push({ ...newBook, score });
        console.log(bookData);
      }
    }
  }

  return bookData;
};