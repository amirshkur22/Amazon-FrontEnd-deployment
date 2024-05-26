import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleProducts from "../../Components/Products/SingleProducts";
import Loader from "../../Components/Loader/Loader";
const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    let fetchData = async () => {
      try {
        setLoading(true);
        const response = await Axios.get(
          `https://fakestoreapi.com/products/${productId}`
        );
        setProduct(response.data);
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
      {isLoading ? (
        <Loader />
      ) : (
        <SingleProducts {...product} flex={true} hasDescription={true} isAdded={true} showItemQuantity={false}/>
      )}
    </>
  );
};

export default ProductDetails;
