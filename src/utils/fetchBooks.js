import { searchMolyBooks } from './api';
import { getQuote } from './api';


const calculateBookScore = (book) => {
  const bookData = book;
  const quotes = bookData.quotes;
  const reviews = bookData.reviews;
  const editions = bookData.editions;

  let quotesScore = quotes.length * 5;
  if (quotesScore > 50) {
      quotesScore = 50;
  }

  let minReviewRating = 10;
  let maxReviewRating = 0;
  let totalReviewWords = 0;
  let goodReviews = 0;
  let badReviews = 0;

  reviews.forEach(review => {
      const rating = review.rating;
      const words = review.review.split(/\s+/).length;

      if (rating < minReviewRating) {
          minReviewRating = rating;
      }
      if (rating > maxReviewRating) {
          maxReviewRating = rating;
      }

      totalReviewWords += words;

      if (rating >= 8) {
          goodReviews++;
      } else if (rating <= 4) {
          badReviews++;
      }
  });

  const reviewScore = ((goodReviews - badReviews) / reviews.length) * 25;

  let totalPages = 0;
  editions.forEach(edition => {
      totalPages += edition.pages;
  });

  const averagePages = totalPages / editions.length;
  let pagesScore = 0;
  if (averagePages >= 100 && averagePages <= 500) {
      pagesScore = 25;
  }

  const totalScore = quotesScore + reviewScore + pagesScore;

  return totalScore > 100 ? 100 : totalScore;
}

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
