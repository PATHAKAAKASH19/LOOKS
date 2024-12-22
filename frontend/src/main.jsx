import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import ErrorPage from "./pages/errorPage/ErrorPage.jsx";
import App from "./App.jsx";
import HomePage from "./pages/homePage/HomePage.jsx";
import CartPage from "./pages/cartPage/CartPage.jsx";
import ProductListPage from "./pages/productListPage/ProductListPage.jsx";
import ProductPage from "./pages/productPage/ProductPage.jsx";

import Auth from "./pages/authPage/Auth.jsx";
import SellerPage from "./pages/sellerPage/SellerPage.jsx";
import CreateCategory from "./components/createCategory/CreateCategory.jsx";
import CreateProduct from "./components/createProduct/CreateProduct.jsx";

import UserPage from "./pages/userPage/UserPage.jsx";

import ShowProducts from "./components/showProducts/ShowProducts.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },

      {
        path: ":category",
        element: <ProductListPage />,
      },

      {
        path: "product",
        children: [
          {
            path: ":productId",
            element: <ProductPage />,
          },
        ],
      },

      {
        path: "cart",
        element: <CartPage />,
      },

      {
        path: "user",
        children: [
          {
            path: ":auth",
            element: <Auth></Auth>,
          },

          {
            path: "dashboard",
          },
        ],
      },

      {
        path: "seller-dashboard",
        element: <SellerPage></SellerPage>,
        children: [
          {
            index: true,
            element: <Navigate to="products" replace />, // Placeholder content
          },
          {
            path: "create-category",
            element: <CreateCategory></CreateCategory>,
          },
          {
            path: "create-product",
            element: <CreateProduct></CreateProduct>,
          },

          {
            path: "products",
            element: <ShowProducts></ShowProducts>,
          },

          {
            path: "update-product",
            children: [
              {
                path:":id",
                element: <CreateProduct></CreateProduct>
              }
            ]
          }
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
