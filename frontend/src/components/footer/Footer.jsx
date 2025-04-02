import React from "react";
import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Container from "../ui/container/Container";

export default function Footer() {
  return (
    <Container className="footer-con">
      <div>
        <Link className="link-con">
          <h2 className="logo">LOOKS</h2>
        </Link>
      </div>
      <Container className="footer">
        <Container className="sub-footer">
          <h2>details</h2>
          <Link to="/seller/signup" className="link-con" >
            admin signup
          </Link>
          <Link to="/" className="link-con">
            contact us
          </Link>
          <Link to="/" className="link-con">
            faqs
          </Link>
          <Link to="/" className="link-con">
            customer care
          </Link>
        </Container>

        <Container className="social-icon sub-footer">
          <h2 >Socials</h2>

          <a href="https://github.com/PATHAKAAKASH19/e-commerce-App" target="_blank" rel="noopener noreferrer">
            <FaGithub style={{ color: "white", fontSize: "25px" }} />
          </a>
          
          <a href="https://x.com/PathakAkash_10" target="_blank" rel="noopener noreferrer">
            <FaXTwitter style={{ color: "white", fontSize: "25px" }} />
          </a>
         


          <a href="https://www.linkedin.com/in/akash-pathak-48026a221/" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn style={{ color: "white", fontSize: "25px" }} />
          </a>

         
        

          <a href="https://github.com/PATHAKAAKASH19" target="_blank" rel="noopener noreferrer">
            <FaInstagram style={{ color: "white", fontSize: "25px" }} />
          </a>
        </Container>
      </Container>
    </Container>
  );
}
