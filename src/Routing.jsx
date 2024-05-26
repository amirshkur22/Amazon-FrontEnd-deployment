import React, { useContext, useEffect } from "react";
import SighUpSignIn from "./pages/Authentication/SighUpSignIn";
import SharedComponents from "./Components/SharedComponents/SharedComponets";
import Home from "./pages/Home/Home";
import Payment from "./pages/Payment/Payment";
import Orders from "./pages/Orders/Orders";
import Cart from "./pages/Cart/Cart";
import CategoriesDetails from "./pages/CategoriesDetails/CategoriesDetails";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import { Route, Routes } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { DataContext } from "./App";
import { auth } from "./Utility/firebase";
import { Type } from "./Utility/Action.type";
import RouteProtectector from "./Components/RouteProtectector/RouteProtectector";
const stripePromise = loadStripe(import.meta.env.VITE_Public_STRIPE_KEY);

const Routing = () => {
  const [{ user }, dispatch] = useContext(DataContext);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // console.log(authUser);
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, []);
  return (
    <>
      <Routes>
        <Route path="/auth" element={<SighUpSignIn />} />
        <Route path="/" element={<SharedComponents />}>
          <Route path="/" element={<Home />} />

          <Route
            path="/pay"
            element={
              <RouteProtectector
                msg={"before proceed to checkout you must log in"}
                redirect={"/pay"}
              >
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              </RouteProtectector>
            }
          />
          <Route
            path="/order"
            element={
              <RouteProtectector
                msg={"before check your orders you must log in"}
                redirect={"/order"}
              >
                <Orders />
              </RouteProtectector>
            }
          />

          <Route
            path="/cart"
            element={
              <RouteProtectector
                msg={"before add to cart you must log in"}
                redirect={"/cart"}
              >
                <Cart />
              </RouteProtectector>
            }
          />
          <Route
            path="category/:categoryName"
            element={<CategoriesDetails />}
          />
          <Route
            path="category/:categoryName/products/:productId"
            element={<ProductDetails />}
          />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default Routing;
