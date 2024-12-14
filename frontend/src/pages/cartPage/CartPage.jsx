import React from "react";
import InputBox from "../../components/ui/inputBox/InputBox";
import Container from "../../components/ui/container/Container";
import Button from "../../components/ui/button/Button";
import { useState, useEffect } from "react";
import Title from "../../components/ui/title/Title";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function CartPage() {
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const fetchProductsImage = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/product/get?category=${"oversized tees"}`
        );
        const productsImage = await res.json();

        if (productsImage !== null) {
          console.log(productsImage);
          setProduct(productsImage);
        }
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchProductsImage();
  }, []);

  return (
    <>
      {product && (
        <Container className="cart">
          <Container className="product-con">
            <Container className="product">
              <Container className="imgBox">
                <img src={product[0].productImgUrls[0]} />
              </Container>

              <Container className="product-info">
                <Title title={`${product[0].name}`}></Title>
                <Container className="size">
                  <label htmlFor="size">Size - </label>
                  <select name="size" id="size">
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XLL">XLL</option>
                  </select>
                </Container>

                <Container className="cloth-color">
                  <h3 className="dark">Color -</h3>
                  <h3>yellow</h3>
                </Container>

                <Container className="p">
                  <RiDeleteBin6Line className="delete" />
                  <h3>INR 1,555</h3>
                </Container>
              </Container>
            </Container>
          </Container>

          <Container className="price-con">
            <Container className="sub-con">
              <Container className="discount-box">
                <InputBox
                  type="text"
                  placeholder="add discount code"
                  name="discount"
                  required={true}
                ></InputBox>

                <Button title="Apply" route="/route" className="discount-btn" />
              </Container>

              <Container className="sub-total">
                <h3>subtotal</h3>
                <h3>inr 2000</h3>
              </Container>

              <Container className="shipping-cost">
                <h3>shipping cost</h3>
                <h3>inr 2000</h3>
              </Container>

              <Container className="total">
                <h2>total</h2>
                <h2>inr 2000</h2>
              </Container>
            </Container>

            <Button title="CHECKOUT" route="/route" className="checkout-btn" />
          </Container>
        </Container>
      )}
    </>
  );
}
