import { searchMolyBooks } from './api';
import { getQuote } from './api';


const calculateBookScore = (obj) => {
  const bestPageNumber = 200;
  const minWordPerQuote = 10
  const maxWordPerQuote = 25
  const atLeastKedvenc = 10;

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

export const getRandomQuotes = (categories, count) => {
  const randomQuotes = [];
  const categoriesCopy = [...categories]; // Create a copy of the categories array to avoid modifying the original array

  for (let i = 0; i < count && categoriesCopy.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * categoriesCopy.length);
    randomQuotes.push(categoriesCopy[randomIndex]);
    categoriesCopy.splice(randomIndex, 1); // Remove the selected quote from the categoriesCopy array
  }

  return randomQuotes;
};
export const getRandomItems = (array, count) => {
  const randomItems = [];
  const arrayCopy = [...array]; // Create a copy of the array to avoid modifying the original array

  for (let i = 0; i < count && arrayCopy.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * arrayCopy.length);
    randomItems.push(arrayCopy[randomIndex]);
    arrayCopy.splice(randomIndex, 1); // Remove the selected item from the arrayCopy array
  }

  return randomItems;
};


export const fetchBooks = async (quotes) => {
  const bookData = [];

  for (const quote of quotes) {
    if (quote.szerzo !== '' && quote.forras !== '') {
     const quoteList = await getQuote(quote.forras);
      const books = await searchMolyBooks(quote.forras, quote.szerzo, quoteList);

      for (const book of books) {
        const score = calculateBookScore({
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
        });
        bookData.push({
          id: book.id,
          title: `${book.title} by ${book.author}`,
          quotes: quoteList,
          score: score,
          author: book.author,
          cover: book.cover,
          description: book.description,
          url: book.url,
          citations: book.citations,
          reviews: book.reviews,
          editions: book.editions,
          categories: book.categories,
        });
        console.log(bookData);
      }
    }
  }

  return bookData;
};