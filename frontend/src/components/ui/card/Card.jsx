import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../container/Container";

export default function Cards({ image, route }) {
  return (
    <Link className="link1" to={`${route}`}>
      <Container className="container">
        <img src={image.imgUrl} alt={image.category} />

        <h2>{image.category.toUpperCase()}</h2>
      </Container>
    </Link>
  );
}
