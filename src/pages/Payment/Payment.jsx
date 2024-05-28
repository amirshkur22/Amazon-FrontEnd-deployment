import { useContext, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import CurrencyFormatter from "../../Components/currencyFormat/CurrencyFormat.jsx";
import axoiosInstance from "../../Api/Axios.jsx";
import { firestore, collection, doc, setDoc } from "../../Utility/firebase.jsx";
import paymentStyle from "./payment.module.css";
import SingleProducts from "../../Components/Products/SingleProducts.jsx";
import { DataContext } from "../../App.jsx";
import { Type } from "../../Utility/Action.type";
const Payment = () => {
  const [{ user, cart }, dispatch] = useContext(DataContext);

  const totalItem = cart?.reduce((acc, cur) => {
    return acc + cur.quantity;
  }, 0);

  const totalPrice = cart?.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.price * currentItem.quantity;
  }, 0);

  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    // console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);
      // 1. backend || functions ---> contact to the client secret
      const response = await axoiosInstance({
        method: "POST",
        url: `/payment/create?total=${totalPrice * 100}`,
      });

      // console.log(response.data);
      const clientSecret = response.data?.clientSecret;

      //       // 2. client side (react side confirmation using stripe)
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      // console.log(paymentIntent);

      //       // 3. after the confirmation --> order firestore database save, clear cart
      const ordersCollection = collection(
        firestore,
        "users",
        user.uid,
        "orders"
      );
      const orderDoc = doc(ordersCollection, paymentIntent.id);
      await setDoc(orderDoc, {
        cart: cart,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });
      // empty the cart
      dispatch({ type: Type.EMPTY_cart });

      setProcessing(false);
      navigate("/order", { state: { msg: "you have placed new Order" } });
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };
  return (
    <>
      <div className={paymentStyle.paymentHeader}>
        Checkout ({totalItem}) items
      </div>
      <section className={paymentStyle.payment}>
        <div className={paymentStyle.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>1000 Jemo Street</div>
            <div>AA, Ethiopia</div>
          </div>
        </div>
        <hr />
        <div className={paymentStyle.flex}>
          {" "}
          <h3>Review items and delivery</h3>
          <div className={paymentStyle.flexImage}>
            {cart?.map((item) => (
              <SingleProducts
                key={item.id}
                {...item}
                mb={true}
                showItemQuantity={false}
              />
            ))}
          </div>
        </div>
        <hr />
        <div className={paymentStyle.flex}>
          <h3>Payment methods</h3>
          <div className={paymentStyle.paymentCardContainer}>
            <div className={paymentStyle.paymentDetails}>
              <form onSubmit={handlePayment}>
                {cardError && <small>{cardError}</small>}
                <CardElement onChange={handleChange} />
                <div className={paymentStyle.paymentPrice}>
                  <div>
                    <span>
                      <p>Total Order |</p>{" "}
                      <CurrencyFormatter amount={totalPrice} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={paymentStyle.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please Wait ...</p>
                      </div>
                    ) : (
                      " Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Payment;
