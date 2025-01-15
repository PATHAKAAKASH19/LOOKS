import React, { memo } from "react";
import { Link } from "react-router-dom";
import Container from "../container/Container";

export const Card = memo(({ image, route }) => {
  return (
    <Link className="link1" to={route}>
      <Container className="container">
        <img src={image.imgUrl} alt={image.category} />

        <h2>{image.category.toUpperCase()}</h2>
      </Container>
    </Link>
  );
});
