import React from "react";
import Container from "../../components/ui/container/Container";
import { Link, Outlet } from "react-router-dom";

export default function UserPage() {
  return (
    <Container className="user-box">
      <Container children="user-sub-box">
        <Link to="profile">
          <h1>My Profile</h1>
        </Link>

        <Link to="address">
          <h1>My address</h1>
        </Link>

        <Link to="wishlist">
          <h1>My Wishlist</h1>
        </Link>

        <Link to="orders">
          <h1>My Orders</h1>
        </Link>

        <Link to="changePassword">
          <h1>Change Password</h1>
        </Link>
      </Container>

      <Outlet />
    </Container>
  );
}
