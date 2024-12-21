import React, { useEffect, useState } from "react";
import Container from "../ui/container/Container.jsx";
import { Link } from "react-router-dom";

export default function ShowProducts() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/product/get-all-product"
        );

        const data = await res.json();

        if (res.status === 200) {
          setProductList(data);
        }
      } catch (error) {
        console.log("err : ", error);
      }
    };

    fetchProductList();
  }, []);
  return (
    <Container className="admin-panel">
      {productList && productList.length > 0 ? (
        productList.map((product, index) => {
          return (
            <Container key={product._id}>
              <Link to="">
                <Container>
                  <img src={`${product.productImgUrls[0]}`} alt="" />
                </Container>
                <h1 key={product._id}>{product.name}</h1>
              </Link>
            </Container>
          );
        })
      ) : (
        <h2>nothing is here</h2>
      )}
    </Container>
  );
}
