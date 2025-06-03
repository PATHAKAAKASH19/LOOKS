import { useEffect, useState } from "react";
import Container from "../../ui/container/Container";
import OrderedItems from "../../orderedItems/OrderedItems";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import Spinner from "../../ui/spinner/Spinner";

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const { accessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const IS_MOBILE = window.innerWidth <= 786;

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/order/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const data = await res.json();

        if (res.status === 200) {
        
          setOrders(data.userOrders);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        toast.error(`${error}`);
      }
    };

    if (accessToken) {
      fetchOrders();
    }
  }, [accessToken]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {isLoading ? (
        <Container className="user-address-box2">
          <Spinner height={IS_MOBILE ? "60vh" : "100%"} width="100%"></Spinner>
        </Container>
      ) : (
        <Container className="user-address-box">
          {orders.length > 0 ? (
            orders.map((order) => (
              <OrderedItems
                Items={order.orderedItem}
              
                key={order._id}
              />
            ))
          ) : (
            <Container className="wishlist-con2">
              <h1>No orders yet</h1>
              <h2>
                Browse our awesome collection and place your first order!!
              </h2>
              <Link to="/" className="link-con">
                Shop now
              </Link>
            </Container>
          )}
        </Container>
      )}
    </>
  );
}
