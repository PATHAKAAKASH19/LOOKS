import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Container from "../../components/ui/container/Container";

export default function SellerPage() {
  return (
    <Container className="admin">
      <Container className="admin-sidebar">
        <NavLink
          to="create-category"
          className={({ isActive }) =>
            isActive ? "active-link" : "not-active-link"
          }
        >
          <h1 className="h1">Create Category</h1>
        </NavLink>

        <NavLink
          to="create-product"
          className={({ isActive }) =>
            isActive ? "active-link" : "not-active-link"
          }
          style={{ borderTop: "2px solid", borderBottom: "2px solid" }}
        >
          <h1 className="h1">Create Product</h1>
        </NavLink>

        <NavLink
          to="products"
          className={({ isActive }) =>
            isActive ? "active-link" : "not-active-link"
          }
        >
          <h1 className="h1">Products</h1>
        </NavLink>
      </Container>
      <Outlet></Outlet>
    </Container>
  );
}
