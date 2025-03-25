import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <Container>
     
      <Container>404 page not found</Container>
      <Link to="/">Back To Home Page</Link>
    </Container>
  );
}
