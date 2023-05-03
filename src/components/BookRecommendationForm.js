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
          Válassz kategóriát:
        </label>
        <Select
            isOptionDisabled={(option) => selectedCategories.length >= 3}
            id="category-select"
            options={categoryOptions}
            placeholder={'Maximum 3 kategória'}
            onChange={handleCategoryChange}
            isMulti
            value={selectedCategories}
            closeMenuOnSelect={false}
          />

      </div>
      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-primary">
          Keresés
        </button>
      </div>
    </form>
  );
};

export default BookRecommendationForm;
