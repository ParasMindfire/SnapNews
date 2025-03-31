import React from "react";

const categories = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

const CategoryBar = ({ setCategory }) => {
  return (
    <div className="category-bar">
      {categories.map((cat) => (
        <button key={cat} onClick={() => setCategory(cat)}>
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;
