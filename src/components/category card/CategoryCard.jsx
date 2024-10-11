import React from "react";
import "./CategoryCard.css";

function CategoryCard(props) {
  return (
    <>
      <div className="category-card">
        <img
          className="category-image"
          src={props.url}
          alt={props.categoryName}
        />
      </div>
    </>
  );
}

export default CategoryCard;
