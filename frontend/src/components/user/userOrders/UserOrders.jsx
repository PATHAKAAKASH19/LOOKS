import React, { useEffect, useState } from "react";
import Container from "../../ui/container/Container";
import OrderedItems from "../../orderedItems/OrderedItems";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const {accessToken} = useAuth()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/order/`, {
            method:"GET",
            headers:{
              "Authorization":`Bearer ${accessToken}`
            }
          }
        );

        const data = await res.json();

        if (res.status === 200) {
          setOrders(data.userOrders);
        }
      } catch (error) {
        toast.error(`${error}`);
      }
    };

    fetchOrders();
  }, []);


  useEffect(() => {
       window.scrollTo(0, 0);
    }, []);
  

  return (
    <Container className="user-address-box">
      {orders.length > 0 ? (
        orders.map((order, key) => (
          <OrderedItems Items={order.orderedItem} status={order.orderStatus} />
        ))
      ) : (
        <Container className="wishlist-con2">
           <h1>No orders yet</h1>
           <h2>Browse our awesome collection and place your first order!!</h2>
          <Link to="/" className="link-con">
             Shop now
          </Link>
        </Container>
      )}
    </Container>
  );
}
