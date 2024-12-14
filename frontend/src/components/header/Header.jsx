import React from "react";
import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { MdFavoriteBorder } from "react-icons/md";


export default function Header() {
  return (
    <div className="navbar">
      <div>
        <Link className="link" to="/home">
          <h2 className="logo">LOOKS</h2>
        </Link>
      </div>
      <div className="subnav1">
        <ul className="header-link">
          <li>
            <Link className="link1">Home</Link>
          </li>
          <li>
            <Link className="link1">About</Link>
          </li>
          <li>
            <Link className="link1">FAQs</Link>
          </li>
        </ul>
      </div>

      <div className="subnav2">
        <Link className="link">
          <FiUser className="icon" />
        </Link>
        <Link>
          <MdFavoriteBorder className="icon" />
        </Link>
        <Link className="link" to="/cart">
          <IoCartOutline className="icon" />
        </Link>
      </div>
    </div>
  );
}

