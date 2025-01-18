import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../components/ui/button/Button";

import Container from "../../components/ui/container/Container";
import Title from "../../components/ui/title/Title";
import createSlug from "../../utils/createSlug";
import slugToStr from "../../utils/slugToStr";
import ProductListCard from "../../components/productListCard/ProductListCard";
import { useAuth } from "../../context/authContext.jsx";
import { Toaster, toast } from "react-hot-toast";

export default function ProductPage() {
  const { productName } = useParams() || "";
  const navigate = useNavigate();

  const { accessToken, setAccessToken, userId } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productName]);

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

  const getAccessToken = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/auth/generate-new-access-token`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (res.status === 401) {
        navigate(`/account/login`);
      } else {
        setAccessToken(data.accessToken);
      }
    } catch (error) {
      console.error("Error in token generation", error);
      navigate(`/account/login`);
    }
  };

  const submitAddToCart = async () => {
    return await fetch("http://localhost:3000/api/cart", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },

      body: JSON.stringify({
        productId: product._id,
        quantity: 1,
        size: size,
        userId: userId
      }),
    });
  };

  const addItemToCart = async () => {
    console.log("aaka1")
    try {
      console.log("aaka2")
      if (!accessToken) {
        console.log("aaka3")
        await getAccessToken();
        console.log("aad")
      }

      const res = await submitAddToCart();

      if (res.status === 401) {
        await getAccessToken();
        await submitAddToCart();
      } else {
        toast(
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div>
              <img
                src={product.productImgUrls[0]}
                alt={product.name}
                style={{ width: "50px", height: "50px", borderRadius: "8px" }}
              />
            </div>
            <div>
              <strong>{product.name}</strong>
            </div>
          </div>,
          {
            duration: 3000,
            position: "top-right",
            style: {
              border: "1px solid #4caf50",
              borderRadius: "10px",
              background: "#fff",
              color: "#333",
            },
          }
        );
      }
    } catch (error) {
      console.log("error in adding item to cart", error);
    }
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        if (productName) {
          const name = slugToStr(productName);

          const res = await fetch(
            `http://localhost:3000/api/product?name=${name}`
          );

          const productData = await res.json();

          if (productData) {
            setSrcAttribute(productData[0].productImgUrls[0]);
            setProduct(productData[0]);

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
              <button
                type="button"
                className="button2"
                onClick={addItemToCart}
              >Add to Cart</button>
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
                  return (
                    <ProductListCard
                      key={prod._id}
                      data={prod}
                      type="productList"
                      route={`/product/${createSlug(prod.name)}`}
                    />
                  );
                }
              })
            : "nothing to show"}
        </Container>
        <Toaster />
      </Container>
    </>
  );
}
