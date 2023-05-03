import { searchMolyBooks } from './api';
import { getQuote } from './api';


const calculateBookScore = (obj) => {
  const bestPageNumber = 150;
  const bestWordCount = 35;
  const atLeastKedvenc = 100;

  let sum = 0;
  obj.quotes.forEach(quote => {
    sum += quote.kedvenc;
  });
  const averageKedvenc = sum / obj.quotes.length;

  let kedveltPart;
  if (averageKedvenc >= atLeastKedvenc) {
    kedveltPart = Math.min(1, (averageKedvenc / atLeastKedvenc));
  } else {
    kedveltPart = (averageKedvenc / atLeastKedvenc);
  }

  let totalPages = 0;
  obj.editions.forEach(edition => {
    totalPages += edition.pages;
  });
  const averagePages = totalPages / obj.editions.length;

  let totalWords = 0;
  const citationsAndQuotes = [];
  obj.citations.forEach(citation => {
    citationsAndQuotes.push(citation.citation);
    const wordCount = citation.citation.split(' ').length;
    totalWords += wordCount;
  });
  obj.quotes.forEach(quote => {
    citationsAndQuotes.push(quote.idezetszoveg);
    const wordCount = quote.idezetszoveg.split(' ').length;
    totalWords += wordCount;
  });
  const averageWords = totalWords / citationsAndQuotes.length;

  const pageScore = Math.min(averagePages / bestPageNumber, 1);
  const wordScore = Math.min(averageWords / bestWordCount, 1);
  const score = (pageScore + wordScore + kedveltPart) / 3 * 100;

  return score;
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
