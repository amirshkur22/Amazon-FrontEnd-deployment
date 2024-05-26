import React from "react";
import {Link} from 'react-router-dom'
import singleCategoryStyles from "./category.module.css";
const SingleCategory = ({ title, category, image }) => {
  return (
    <div className={singleCategoryStyles.singleCategoryContainer}>
      <Link to={`category/${category}`}>
        <span>
          <h2>{title}</h2>
        </span>
        <img src={image} alt=""  />
      </Link>
      <p>Shop now</p>
    </div>
  );
};

export default SingleCategory;
