import { useContext, useEffect, useState } from "react";
import orderStyle from "./orders.module.css"
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import {firestore}  from "../../Utility/firebase";
import SingleProducts from "../../Components/Products/SingleProducts";
import { DataContext } from "../../App";
import Loader from '../../Components/Loader/Loader'
const Orders = () => {
  const [{ user ,cart}, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (user) {
      // Reference to the user's orders collection
      const userOrdersCollection = collection(firestore, "users", user.uid, "orders");
      
      // Create a query to order documents by 'created' field in descending order
      const ordersQuery = query(userOrdersCollection, orderBy("created", "desc"));

      // Set up a real-time listener for the query
      const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
        // console.log(snapshot);
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
        setLoading(false)
      });

      // Cleanup the listener on unmount
      return () => unsubscribe();
    } else {
      setOrders([]);
      setLoading(false)
    }
  }, [user]);
  return (
    <section className={orderStyle.container}>
    <div className={orderStyle.ordersContainer}>
      <h2>Your Orders</h2>
      {loading ? (
        <Loader />
      ):(orders?.length == 0 && (
        <div style={{ padding: "20px" }}>
          you don&apos;t have orders yet.
        </div>
      ))}
      <div>
        {orders?.map((singleOrder, index) => {
          return (
            <div key={index}>
              <hr />
              <p>Order ID: {singleOrder?.id}</p>
              {singleOrder?.data?.cart?.map((order,index) => (
                <SingleProducts flex={true} {...order}  key={order.id} showItemQuantity={true} />
              ))
            }
            </div>
          );
        })}
      </div>
    </div>
  </section>
  );
};

export default Orders;
