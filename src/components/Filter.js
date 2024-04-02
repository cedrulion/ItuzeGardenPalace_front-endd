import React from 'react';

const Filter = ({ categories, selectedCategory, handleCategoryChange }) => {
  return (
    <div className="flex justify-center my-4">
      <select
        value={selectedCategory}
        onChange={e => handleCategoryChange(e.target.value)}
        className="block w-full max-w-xs px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs"
      >
        <option value="">All</option>
        {categories.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
