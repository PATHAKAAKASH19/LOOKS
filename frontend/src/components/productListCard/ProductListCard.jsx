import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "../ui/container/Container";

export default function ProductListCard({ route, data }) {
  const imgRef = useRef();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 100); //
        observer.disconnect();

        return () => clearTimeout(timer);
      }
    });

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
  }, []);

  return (
    <div className="product" ref={imgRef}>
      {isVisible && (
        <Link className="link1" to={`${route}`} style={{ height: "400px" }}>
          <img src={data.productImgUrls[0]} alt={data.category} />

          <Container className="product-info-box">
            <h2>{data.name}</h2>

            <h2>INR {data.price}</h2>

            <ul className="sizes">
              {data.sizes.map((size, index) => {
                return <li key={index}>{size}</li>;
              })}
            </ul>
          </Container>
        </Link>
      )}
    </div>
  );
}
