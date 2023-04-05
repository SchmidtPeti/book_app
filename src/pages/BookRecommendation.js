import React, { useState } from 'react';
import { categories } from '../data/categories';
import Select from 'react-select';
import { fetchQuotesByCategory } from '../utils/api';

const BookRecommendation = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categoryOptions = categories.map((category) => ({
    value: category.url,
    label: category.title,
  }));

  const handleCategoryChange = (selected) => {
    setSelectedCategories(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allQuotes = [];
    for (const category of selectedCategories.map((c) => c.label)) {
      const quotes = await fetchQuotesByCategory(category);
      allQuotes.push(...quotes);
    }

    console.log('All quotes from selected categories:', allQuotes);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h1 className="mt-4">Book Recommendation</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-8 offset-md-2">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="category-select" className="form-label">Select categories:</label>
              <Select
                id="category-select"
                options={categoryOptions}
                onChange={handleCategoryChange}
                isMulti
                closeMenuOnSelect={false}
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">Search</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookRecommendation;
