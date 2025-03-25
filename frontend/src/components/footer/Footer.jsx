import React from "react";
import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
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
          <Link to="/admin" className="link-con">
            admin login
          </Link>
          <Link to="/contact" className="link-con">
            contact us
          </Link>
          <Link to="/faqs" className="link-con">
            faqs
          </Link>
          <Link to="customer-care" className="link-con">
            customer care
          </Link>
        </Container>

        <Container className="social-icon sub-footer">
          <h2 >Socials</h2>
          <Link>
            <FaXTwitter style={{ color: "white", fontSize: "25px" }} />
          </Link>
          <Link>
            <FaInstagram style={{ color: "white", fontSize: "25px" }} />
          </Link>
          <Link>
            <FaLinkedinIn style={{ color: "white", fontSize: "25px" }} />
          </Link>
          <Link>
            <FaPinterest style={{ color: "white", fontSize: "25px" }} />
          </Link>
        </Container>
      </Container>
    </Container>
  );
}
