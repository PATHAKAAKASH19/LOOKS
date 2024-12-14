import React from "react";
import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import Container from "../ui/container/Container";

export default function Footer() {
  return (
    <Container className="footer">
      <div>
        <Link className="link">
          <h2 className="logo">LOOKS</h2>
        </Link>
      </div>
      <Container className="sub-footer">
        <Container className="user">
          <h2 className="h2">details</h2>
          <Link to="/admin" className="link">
            admin login
          </Link>
          <Link to="/contact" className="link">
            contact us
          </Link>
          <Link to="/faqs" className="link">
            faqs
          </Link>
          <Link to="customer-care" className="link">
            customer care
          </Link>
        </Container>

        <Container className="social-icon">
          <h2 className="h2">Socials</h2>
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
