import { searchMolyBooks } from './api';
import { getQuote } from './api';


const calculateBookScore = (obj) => {
  const citationsAndQuotes = [];

  // Extract citation text from the "citations" array
  obj.citations.forEach(citation => {
    citationsAndQuotes.push(citation.citation);
  });

  // Extract quotes "idezetszoveg" text from the "quotes" array
  obj.quotes.forEach(quote => {
    citationsAndQuotes.push(quote.idezetszoveg);
  });

  // Calculate the average number of pages for the editions
  let totalPages = 0;
  obj.editions.forEach(edition => {
    totalPages += edition.pages;
  });
  const averagePages = totalPages / obj.editions.length;

  // Calculate the average word count for the citationsAndQuotes array
  let totalWords = 0;
  citationsAndQuotes.forEach(text => {
    const wordCount = text.split(' ').length;
    totalWords += wordCount;
  });
  const averageWords = totalWords / citationsAndQuotes.length;

  // Log the extracted data and the calculated averages to the console
  console.log('Citations and Quotes:', citationsAndQuotes);
  console.log('Average Number of Pages:', averagePages);
  console.log('Average Word Count for Citations and Quotes:', averageWords);
  const bestPageNumber = 150;
  const bestWordCount = 50;
  const pageScore = Math.min(averagePages / bestPageNumber, 1);
  const wordScore = Math.min(averageWords / bestWordCount, 1);
  const score = (pageScore + wordScore) / 2 * 100;

  // Return the calculated score
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
