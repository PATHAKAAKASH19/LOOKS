import React, { useEffect, useState } from "react";
import Container from "../../ui/container/Container";
import OrderedItems from "../../orderedItems/OrderedItems";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function UserOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `http://192.168.0.104:3000/api/order/678761ba46047b57d7132fad`
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
