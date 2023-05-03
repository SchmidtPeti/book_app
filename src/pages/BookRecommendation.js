import React, { useState } from 'react';
import { categories } from '../data/categories';
import { fetchQuotesByCategory } from '../utils/api';
import { useAppContext } from '../context/AppContext';
import BookCards from '../components/book/BookCards';
import PageHeader from '../components/PageHeader';
import BookRecommendationForm from '../components/BookRecommendationForm';
import { fetchBooks } from '../utils/fetchBooks';
import { ProgressBar } from 'react-bootstrap';


const BookRecommendation = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [progress, setProgress] = useState(0); // Add progress state

  const {
    updateData,
    setLoading,
    setnotFoundSearch,
    loading
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
  
    const limitedCategories = selectedCategories; // Limit the number of categories to 5
    console.log("i hope it works: ",limitedCategories);
    console.log('All quotes from selected categories:', limitedCategories.map((c) => c.label));
  
    setLoading(true);
    const allQuotes = [];
    for (const category of limitedCategories.map((c) => c.label)) {
      const quotes = await fetchQuotesByCategory(category);
      allQuotes.push(...quotes);
    }
  
    console.log('All quotes from selected categories:', allQuotes);


    const booksData = [];
    for (let i = 0; i < allQuotes.length; i++) {
        const bookData = await fetchBooks([allQuotes[i]]);
        setProgress((i / allQuotes.length) * 100); // Update progress
        if(bookData.length > 0){
          booksData.push(bookData[0]); // remove from the array so the bookcard can do something with it
        }
    }
    console.log('All books from selected categories:', booksData);
    if (booksData.length > 0) { 
      updateData(booksData);
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
      <PageHeader title={'Könyvajánlás'}  />
      {loading && <ProgressBar now={progress} /> /* Add progress bar */}
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
