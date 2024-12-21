import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/ui/card/Card";
import FilterComponent from "../../components/filterComponent/FilterComponent";
import Container from "../../components/ui/container/Container";

export default function ProductListPage() {
  let { category } = useParams();

  const [product, setProduct] = useState(null);
  const [filter , setFilter] = useState({})

  useEffect(() => {
    const fetchProductsImage = async () => {

      try {
        const res = await fetch(
          `http://localhost:3000/api/product/get?category=${category}`
        );
        const productsImage = await res.json();
        console.log("product",productsImage)
        if (productsImage !== null) {
          console.log(productsImage)
          setProduct(productsImage);
        }
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchProductsImage();
  }, []);

  return (
    <Container className="productList">
      <FilterComponent className="filter" setFilter={setFilter} filter={filter}></FilterComponent>
      {product && (
        <Container className="product-column">
          <Card
            image={product}
            type="productList"
            route={`/product/${product[0]._id}`}
          />
          <Card
            image={product}
            type="productList"
            route={`/product/${product[0]._id}`}
          />
          <Card
            image={product}
            type="productList"
            route={`/product/${product[0]._id}`}
          />
          <Card
            image={product}
            type="productList"
            route={`/product/${product[0]._id}`}
          />
          <Card
            image={product}
            type="productList"
            route={`/product/${product[0]._id}`}
          />
          <Card
            image={product}
            type="productList"
            route={`/product/${product[0]._id}`}
          />
          <Card
            image={product}
            type="productList"
            route={`/product/${product[0]._id}`}
          />
          <Card
            image={product}
            type="productList"
            route={`/product/${product[0]._id}`}
          />
          <Card
            image={product}
            type="productList"
            route={`/product/${product[0]._id}`}
          />
          <Card
            image={product}
            type="productList"
            route={`/product/${product[0]._id}`}
          />
          <Card
            image={product}
            type="productList"
            route={`/product/${product[0]._id}`}
          />
          <Card
            image={product}
            type="productList"
            route={`/product/${product[0]._id}`}
          />
          <Card
            image={product}
            type="productList"
            route={`/product/${product[0]._id}`}
          />
          <Card
            image={product}
            type="productList"
            route={`/product/${product[0]._id}`}
          />
          <Card
            image={product}
            type="productList"
            route={`/product/${product[0]._id}`}
          />
          <Card
            image={product}
            type="productList"
            route={`/product/${product[0]._id}`}
          />
          <Card
            image={product}
            type="productList"
            route={`/product/${product[0]._id}`}
          />
          <Card
            image={product}
            type="productList"
            route={`/product/${product[0]._id}`}
          />
          <Card
            image={product}
            type="productList"
            route={`/product/${product[0]._id}`}
          />
          <Card
            image={product}
            type="productList"
            route={`/product/${product[0]._id}`}
          />
          <Card
            image={product}
            type="productList"
            route={`/product/${product[0]._id}`}
          />
          <Card
            image={product}
            type="productList"
            route={`/product/${product[0]._id}`}
          />
          <Card
            image={product}
            type="productList"
            route={`/product/${product[0]._id}`}
          />
          <Card
            image={product}
            type="productList"
            route={`/product/${product[0]._id}`}
          />
        </Container>
      )}
    </Container>
  );
}
