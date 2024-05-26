// The spread operator (...) is used to destructure the oneCategory object. This means that the operator takes the properties of the object and spreads them out as individual key-value pairs.
import React from "react";
import { categoryData } from "../../data/Data";
import SingleCategory from "./SingleCategory";
import categoriesStyles from "./category.module.css";
const Categories = () => {
  return (
    <div className={categoriesStyles.categoryContainer}>
      {categoryData.map((singleCategory, index) => {
        return <SingleCategory key={index} {...singleCategory} />;
      })}
    </div>
  );
};

export default Categories;
