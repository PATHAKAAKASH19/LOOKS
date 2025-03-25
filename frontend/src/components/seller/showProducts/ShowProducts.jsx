import React, { useEffect, useState } from "react";
import Container from "../../ui/container/Container.jsx";
import createSlug from "../../../utils/createSlug.js";
import ProductCard from "../../productCard/ProductCard.jsx";
import Spinner from "../../ui/spinner/Spinner.jsx";

export default function ShowProducts() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const res = await fetch("http://192.168.0.104:3000/api/product");

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
    <Container className="title1">
      <h1>All Products</h1>
    </Container>
    <Container className="show-product">
      {productList && productList.length > 0 ? (
        productList.map((product) => {
          return (
           <>
           
           <ProductCard
              key={product._id}
              data={product}
              route={`/seller-dashboard/update-product/${createSlug(
                product.name
              )}`}

              
            />

           <ProductCard
              key={product._id}
              data={product}
              route={`/seller-dashboard/update-product/${createSlug(
                product.name
              )}`}

              
            />
           </>


            
          );
        })
      ) : (
        <h2 className="h2-con">No Product is created yet</h2>
      )}
    </Container>
  </Container>
  );
}
