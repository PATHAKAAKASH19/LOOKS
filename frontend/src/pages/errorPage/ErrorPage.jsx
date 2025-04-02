import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import Container from "../../components/ui/container/Container.jsx";

export default function ErrorPage() {


   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

  return (
    <Container className="error-con">
     
      <Container className="illustration">
      
        <img src="../../public/pageNotFound.gif"/>

      </Container>
      <Link to="/"  className="link">Go To Home Page</Link>
      <Link to="https://storyset.com/web" className="reference" target="_blank">Web illustrations by Storyset</Link>
    </Container>
  );
}
