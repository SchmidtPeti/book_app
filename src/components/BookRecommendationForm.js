import React from 'react';
import Select from 'react-select';

const BookRecommendationForm = ({
  categoryOptions,
  handleCategoryChange,
  handleSubmit,
  selectedCategories,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="category-select" className="form-label">
          Select categories:
        </label>
        <Select
          isOptionDisabled={() => selectedCategories.length >= 5}
          id="category-select"
          options={categoryOptions}
          onChange={handleCategoryChange}
          isMulti
          closeMenuOnSelect={false}
        />
      </div>
      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </div>
    </form>
  );
};

export default BookRecommendationForm;
