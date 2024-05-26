import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../App";
import SingleProducts from "../../Components/Products/SingleProducts";
import CurrencyFormat from "../../Components/currencyFormat/CurrencyFormat";
import CartStyle from "./cart.module.css";
import { Type } from "../../Utility/Action.type";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const Cart = () => {
  const [{ cart, user }, dispatch] = useContext(DataContext);

  const totalPrice = cart?.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.price * currentItem.quantity;
  }, 0);
  // console.log(cart)


  const increase = (item) => {
    dispatch({
      type: Type.ADD_TO_CART,
      item,
    });
  };

  const decrease = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_CART,
      id,
    });
  };

  return (
    <section className={CartStyle.cartContainer}>
      <div className={CartStyle.leftSide}>
        <h2>Hello</h2>
        <h3>Your Shopping Cart</h3>
        <hr />
        {cart?.length === 0 ? (
          <h1>Opps!! Your Cart is Empty</h1>
        ) : (
          cart?.map((item, index) => (
            <section key={index} className={CartStyle.cartProduct}>
              <SingleProducts
              key={index}
                {...item}
                flex={true}
                hasDescription={true}
                isAdded={false}
                showItemQuantity={false}
              />
              <div className={CartStyle.buttonConainer}>
                <button onClick={() => increase(item)}>
                  <MdKeyboardArrowUp size={25} />
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => decrease(item.id)}>
                  <MdKeyboardArrowDown size={25} />
                </button>
              </div>
            </section>
          ))
        )}
      </div>
      {cart?.length !== 0 && (
        <div className={CartStyle.rightSide}>
          <div>
            <p>Subtotal ({cart?.length} items)</p>
            <CurrencyFormat amount={totalPrice} />
          </div>
          <span>
            <input type="checkbox" />
            <small>Check this box to apply the coupon code</small>
          </span>
          <Link to="/pay">proceed to CheckOut</Link>
        </div>
      )}
    </section>
  );
};

export default Cart;
