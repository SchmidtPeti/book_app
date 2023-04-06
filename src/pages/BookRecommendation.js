import React, { useState } from 'react';
import { categories } from '../data/categories';
import { fetchQuotesByCategory } from '../utils/api';
import { useAppContext } from '../context/AppContext';
import { searchMolyBooks } from '../utils/api';
import BookCards from '../components/book/BookCards';
import { getQuote } from '../utils/api';
import PageHeader from '../components/PageHeader';
import BookRecommendationForm from '../components/BookRecommendationForm';


const BookRecommendation = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const {
    updateData,
    setLoading,
    setnotFoundSearch
  } = useAppContext();

  const categoryOptions = categories.map((category) => ({
    value: category.url,
    label: category.title,
  }));

  const handleCategoryChange = (selected) => {
    setSelectedCategories(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log('All quotes from selected categories:', selectedCategories.map((c) => c.label));
  
    setLoading(true);
    const allQuotes = [];
    for (const category of selectedCategories.map((c) => c.label)) {
      const quotes = await fetchQuotesByCategory(category);
      allQuotes.push(...quotes);
    }
  
    console.log('All quotes from selected categories:', allQuotes);
  
    const bookData = [];
  
    for (const quote of allQuotes) {
      if (quote.szerzo!=='' && quote.forras!=='') {
        const books = await searchMolyBooks(quote.forras, quote.szerzo, allQuotes);
        const quotes = await getQuote(quote.forras);
        for (const book of books) {
          bookData.push({
            id: book.id,
            title: `${book.title} by ${book.author}`,
            quotes: quotes,
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
  
    if (bookData.length > 0) {
      updateData(bookData);
      setLoading(false);
      setnotFoundSearch(false); // Set notFoundSearch to false when quotes are found
    } else {
      updateData([]);
      setLoading(false);
      setnotFoundSearch(true); // Set notFoundSearch to true when quotes are not found
    }
  };
  
  return (
    <div className="container">
      <PageHeader title={'Book Recommendation'}  />
      <div className="row">
        <div className="col-12 col-md-8 offset-md-2">
        <BookRecommendationForm
            categoryOptions={categoryOptions}
            handleCategoryChange={handleCategoryChange}
            handleSubmit={handleSubmit}
            selectedCategories={selectedCategories}
          />
        </div>
        <BookCards />
      </div>
    </div>
  );
};

export default BookRecommendation;
