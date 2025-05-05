import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Container from "../../ui/container/Container";
import moment from "moment";
import { useSellerAuth } from "../../../context/SellerAuthContext";


export default function ShowOrders() {
  const [orders, setOrders] = useState([])

  const [ordersStatus, setOrdersStatus] = useState({});

  const {sellerToken} = useSellerAuth();

  const handleOrderStatus = async (orderId, productStatus ) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/order/orderStatus`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${sellerToken}`
        },

        body: JSON.stringify({
          productStatus,
          orderId,
         
        }),
      });

      const data = await res.json();
     
     
      if (res.status === 200) {
        console.log(data)
        setOrdersStatus(prev  =>  ({...prev , [data.updatedOrder._id]:data.updatedOrder.orderedItem[0].status}));
      
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/order/seller`, {
          method: "GET",
          headers:{
            "Authorization":`Bearer ${sellerToken}`
          }
        });

        const data = await res.json();

        if (res.status === 200) {
         
          setOrders(data.orders);
          setOrdersStatus(prev  =>  { 
            const newStatus = {};
            data.orders.forEach(order => {
              newStatus[order._id] = order.orderedItem[0].status;
            });
            return { ...prev, ...newStatus };
        })}

      } catch (error) {
        
        toast.error(`${error}`);
      }
    };

   if(sellerToken) {
    fetchOrders();
   }
  }, [sellerToken]);

  const ORDER_STATUS = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container className="admin-panel">
      <Toaster></Toaster>
       <h2 style={{marginTop:"5%"}} className="order-title">Orders</h2>
      {orders.length > 0
        ? orders.map((order, index) => (
            <Container key={order._id} className="order-table">
              <table>
               
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Status</th>
                    <th>Buyer</th>
                    <th>Date</th>
                    <th>Payment</th>
                    <th>No of products</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <select
                        name="orderStatus"
                        value={ordersStatus[order._id]}
                        onChange={(e) =>
                          handleOrderStatus(order._id, e.target.value)
                        }
                      >
                        {ORDER_STATUS.map((s, i) => (
                          <option value={`${s}`} key={i}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>{`${order.userId?.firstName} ${order.userId?.lastName}`}</td>
                    <td>{moment(order.createdAt).fromNow()}</td>
                    <td>{order.paymentStatus ? "Success" : "Failed"}</td>
                    <td>{order.orderedItem.length}</td>
                  </tr>
                </tbody>
              </table>

              {order.orderedItem.length > 0 &&
                order.orderedItem.map((item) => (
                  <Container key={item._id} className="item-con">
                    <Container className="item">
                      <Container className="item-img-con">
                        <img src={`${item.productId.productImgUrls[0]}`} />
                      </Container>
                      <Container className="item-info">
                        <Container>
                          <h2 className="i">Name</h2>
                          <h2 className="info">
                            {item.productId.name.toUpperCase()}
                          </h2>
                        </Container>
                        <Container>
                          <h2 className="i">Quantity</h2>
                          <h2 className="info">{item.quantity}</h2>
                        </Container>
                        <Container>
                          <h2 className="i">Size</h2>
                          <h2 className="info">{item.size.toUpperCase()}</h2>
                        </Container>
                        <Container>
                          <h2 className="i">Price</h2>
                          <h2 className="info">{item.productId.price} Inr</h2>
                        </Container>
                      </Container>
                    </Container>
                  </Container>
                ))}
            </Container>
          ))
        :<Container className="order-con">
          <h1>No order is present</h1>
          </Container>}
    </Container>
  );
}
