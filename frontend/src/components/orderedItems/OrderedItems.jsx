import React from "react";
import Container from "../ui/container/Container";

export default function OrderedItems({ Items }) {
  return (
    <>
      {Items.length > 0 &&
        Items.map((item) => (
          <Container key={`${item._id}`} className="order-item">
            <Container className="order-item-img">
              <img src={`${item.productId.productImgUrls[0]}`} alt="" />
            </Container>

            <h1 className="item-name">{item.productId.name}</h1>

            <h1>
              Size : {item.size.toUpperCase()}
            </h1>

            <h1>Quantity : {item.quantity}</h1>
            <h1>Status : {item.status}</h1>
          </Container>
        ))}
    </>
  );
}
