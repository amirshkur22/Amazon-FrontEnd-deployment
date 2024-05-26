import React, { useEffect, useState } from "react";
import Axios from "axios";
import SingleProducts from "./SingleProducts";
import productsStyle from "./products.module.css";
import Loader from "../Loader/Loader";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    let fetchData = async () => {
      try {
        const response = await Axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {isLoading?(<Loader/>):(<div className={productsStyle.allProdutsContainer}>
        {products?.map((singleproduct, index) => (
          <SingleProducts key={index} {...singleproduct} isAdded={true} showItemQuantity={ false} />
        ))}
      </div>)}
    </>
  );
};

export default Products;
