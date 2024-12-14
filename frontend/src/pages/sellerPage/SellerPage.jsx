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
            <h1 className="h1">CreateCategory</h1>
          </NavLink>

          <NavLink
            to="create-product"
            className={({ isActive }) =>
              isActive ? "active-link" : "not-active-link"
            }
          >
            <h1 className="h1">createProduct</h1>
          </NavLink>

          <NavLink
            to="products"
            className={({ isActive }) =>
              isActive ? "active-link" : "not-active-link"
            }
          >
            <h1 className="h1">products</h1>
          </NavLink>
        </Container>
        <Outlet></Outlet>
      </Container>
   
  );
}
