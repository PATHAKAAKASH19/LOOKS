import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Button from "../../components/ui/button/Button";

import Container from "../../components/ui/container/Container";
import Title from "../../components/ui/title/Title";
import createSlug from "../../utils/createSlug";
import slugToStr from "../../utils/slugToStr";
import ProductListCard from "../../components/productListCard/ProductListCard";

export default function ProductPage() {
  const { productName } = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(pathname);
    window.scrollTo(0, 0);
  }, [pathname]);

  const [product, setProduct] = useState(null);
  const [srcAttribute, setSrcAttribute] = useState("");
  const [size, setSize] = useState("");
  const [productList, setProductList] = useState(null);
  const [categoryId, setCategoryId] = useState(null);

  const Color = (e) => {
    e.target.innerText === size ? setSize("") : setSize(e.target.innerText);
  };

  const handleClick = (e) => {
    setSrcAttribute(e.target.src);
  };

  // const addItemToCart = async () => {
  //   try {
  //     const res = await fetch("http://localhost:3000/api/cart", {
  //       method: "POST",
  //       headers: {
  //         "content-Type": "application/json",
  //       },

  //       body: JSON.stringify({
  //         productId: productId,
  //         quantity: 1,
  //         size: size,
  //       }),
  //     });

  //     const message = await res.json();

  //     console.log(message);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        if (productName) {
          const name = slugToStr(productName);
          console.log(name);
          const res = await fetch(
            `http://localhost:3000/api/product?name=${name}`
          );

          const productData = await res.json();
          console.log(productData);
          if (productData) {
            setSrcAttribute(productData[0].productImgUrls[0]);
            setProduct(productData[0]);
            console.log(productData);
            setCategoryId(productData[0].categoryId);
          }
        }
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchProductData();
  }, [productName]);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        if (categoryId) {
          const res = await fetch(
            `http://localhost:3000/api/product/category/${categoryId}`
          );

          const productList = await res.json();

          if (productList !== null) {
            setProductList(productList);
          }
        }
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchProductsData();
  }, [categoryId, productName]);

  return (
    <>
      {product && (
        <Container className="productPage">
          <Container className="product-img-sec">
            <Container className="img-sub-sec1">
              {product.productImgUrls.map((productImage, index) => {
                return (
                  <img src={productImage} key={index} onClick={handleClick} />
                );
              })}
            </Container>

            <Container className="img-sub-sec2">
              <img src={`${srcAttribute}`} />
            </Container>
          </Container>

          <Container className="product-info-sec">
            <h1 className="name">{product.name.toUpperCase()}</h1>

            <Container className="price">
              <Title title={`Inr ${product.price}`} />
              <h3>incl. all taxes</h3>
            </Container>

            <Container className="description">
              <Title title="description" />

              <h3>{product.description}</h3>
            </Container>
            <Container className="wash-care">
              <Title title="Wash Care" />

              <h3>machine wash</h3>
            </Container>

            <Container className="material-type">
              <Title title="Material Type" />
              <h3>{product.materialType}</h3>
            </Container>

            <Container className="size-sec">
              <Title title="Sizes" />

              <ul className="size">
                {product.sizes.map((sizevalue, index) => {
                  return (
                    <li
                      className="pointer"
                      key={index}
                      onClick={Color}
                      style={
                        size === `${sizevalue}`
                          ? { backgroundColor: "grey" }
                          : null
                      }
                    >
                      {sizevalue}
                    </li>
                  );
                })}
              </ul>
            </Container>

            <Container className="button-box">
              <Button title="size Chat" className="button1" />
              <Button
                title="Add to Cart"
                className="button2"
                // onClick={addItemToCart}
              />
            </Container>
          </Container>
        </Container>
      )}

      <Container className="recommendation-sec">
        <Title className="title" title="Similar Products" />

        <Container className="product-column">
          {productList && productList.length > 0
            ? productList.map((prod) => {
                if (prod._id !== product._id) {
                  return<ProductListCard
                    key={prod._id}
                    data={prod}
                    type="productList"
                    route={`/product/${createSlug(prod.name)}`}
                  />;
                }
              })
            : "nothing to show"}
        </Container>
      </Container>
    </>
  );
}
