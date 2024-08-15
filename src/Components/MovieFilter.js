import React from 'react';

function MovieFilter({ categories, selectedCategories, onCategoryChange }) {
  return (
    <div className="filter-container">
      <label htmlFor="categories">Filter by category:</label>
      <div>
        {categories.map((category) => (
          <div key={category}>
            <input
              type="checkbox"
              id={category}
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={onCategoryChange}
            />
            <label htmlFor={category}>{category}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieFilter;
