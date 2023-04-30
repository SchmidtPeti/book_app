import { searchMolyBooks } from './api';
import { getQuote } from './api';


const calculateBookScore = (book) => {
  const { quotes, reviews, editions } = book;

  const quotesScore = Math.min(quotes.length * 5, 50);

  const reviewData = reviews.reduce((acc, review) => {
    const rating = review.rating;
    const words = review.review.split(/\s+/).length;

    acc.minRating = Math.min(acc.minRating, rating);
    acc.maxRating = Math.max(acc.maxRating, rating);
    acc.totalWords += words;
    acc.goodReviews += rating >= 8 ? 1 : 0;
    acc.badReviews += rating <= 4 ? 1 : 0;

    return acc;
  }, { minRating: 10, maxRating: 0, totalWords: 0, goodReviews: 0, badReviews: 0 });

  const reviewScore = ((reviewData.goodReviews - reviewData.badReviews) / reviews.length) * 25;

  const totalPages = editions.reduce((total, edition) => total + edition.pages, 0);
  const averagePages = totalPages / editions.length;
  const pagesScore = averagePages >= 100 && averagePages <= 500 ? 25 : 0;

  const totalScore = quotesScore + reviewScore + pagesScore;

  return Math.min(totalScore, 100);
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
      }
    }
  }

  return bookData;
};
