import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../../components/ui/button/Button";
import Card from "../../components/ui/card/Card";
import Container from "../../components/ui/container/Container";
import Title from "../../components/ui/title/Title";

export default function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [srcAttribute, setSrcAttribute] = useState("");
  const [size, setSize] = useState("");

  const Color = (e) => {
    e.target.innerText === size
      ? setSize("")
      : setSize(e.target.innerText);
  };

  useEffect(() => {
    const fetchProductImageFromBackend = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/product/search/${productId}`
        );

        const productData = await res.json();

        if (productData) {
          setSrcAttribute(productData.productImgUrls[0]);
          setProduct(productData);
        }
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchProductImageFromBackend();
  }, []);

  const handleClick = (e) => {
    const src = e.target.getAttribute("src");
    setSrcAttribute(src);
  };

  const [productsImage, setProductsImage] = useState(null);

  useEffect(() => {
    const fetchProductsImage = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/product/get?category=${"oversized tees"}`
        );

        const productsImage = await res.json();

        if (productsImage !== null) {
          setProductsImage(productsImage);
        }
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchProductsImage();
  }, []);

  const addItemToCart = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/cart/create", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },

        body: JSON.stringify({
          productId:productId, 
          quantity:1,
           size:size,
        })

      });


      const message = await res.json()

      console.log(message)
    } catch (error) {
      console.log("error", error)
    }
  };

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
            <h1 className="name">{product.name}</h1>

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
                onClick={addItemToCart}
                route={`/product/${productId}`}
              />
            </Container>
          </Container>
        </Container>
      )}

      <Container className="recommendation-sec">
        <Title className="title" title="Similar Products" />

        {productsImage && (
          <Container className="product-column">
            <Card
              image={productsImage}
              type="productList"
              route={`/product/${productsImage[0]._id}`}
            />
            <Card
              image={productsImage}
              type="productList"
              route={`/product/${productsImage[0]._id}`}
            />
            <Card
              image={productsImage}
              type="productList"
              route={`/product/${productsImage[0]._id}`}
            />
            <Card
              image={productsImage}
              type="productList"
              route={`/product/${productsImage[0]._id}`}
            />
            <Card
              image={productsImage}
              type="productList"
              route={`/product/${productsImage[0]._id}`}
            />
            <Card
              image={productsImage}
              type="productList"
              route={`/product/${productsImage[0]._id}`}
            />
            <Card
              image={productsImage}
              type="productList"
              route={`/product/${productsImage[0]._id}`}
            />
            <Card
              image={productsImage}
              type="productList"
              route={`/product/${productsImage[0]._id}`}
            />
            <Card
              image={productsImage}
              type="productList"
              route={`/product/${productsImage[0]._id}`}
            />
            <Card
              image={productsImage}
              type="productList"
              route={`/product/${productsImage[0]._id}`}
            />
            <Card
              image={productsImage}
              type="productList"
              route={`/product/${productsImage[0]._id}`}
            />
            <Card
              image={productsImage}
              type="productList"
              route={`/product/${productsImage[0]._id}`}
            />
            <Card
              image={productsImage}
              type="productList"
              route={`/product/${productsImage[0]._id}`}
            />
            <Card
              image={productsImage}
              type="productList"
              route={`/product/${productsImage[0]._id}`}
            />
            <Card
              image={productsImage}
              type="productList"
              route={`/product/${productsImage[0]._id}`}
            />
            <Card
              image={productsImage}
              type="productList"
              route={`/product/${productsImage[0]._id}`}
            />
            <Card
              image={productsImage}
              type="productList"
              route={`/product/${productsImage[0]._id}`}
            />
          </Container>
        )}
      </Container>
    </>
  );
}
