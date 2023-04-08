import { searchMolyBooks } from './api';
import { getQuote } from './api';

export const fetchBooks = async (quotes) => {
  const bookData = [];

  for (const quote of quotes) {
    if (quote.szerzo !== '' && quote.forras !== '') {
     const quoteList = await getQuote(quote.forras);
      const books = await searchMolyBooks(quote.forras, quote.szerzo, quoteList);

      for (const book of books) {
        bookData.push({
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
      }
    }
  }

  return bookData;
};
