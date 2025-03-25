import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import HomePage from "./pages/homePage/HomePage.jsx";
import ProductListPage from "./pages/productListPage/ProductListPage.jsx";
import ProductPage from "./pages/productPage/ProductPage.jsx";
import CartPage from "./pages/cartPage/CartPage.jsx";

import Auth from "./pages/authPage/Auth.jsx";
import ErrorPage from "./pages/errorPage/ErrorPage.jsx";

import SellerPage from "./pages/sellerPage/SellerPage.jsx";
import CreateCategory from "./components/seller/createCategory/CreateCategory.jsx";
import CreateProduct from "./components/seller/createProduct/CreateProduct.jsx";
import ShowProducts from "./components/seller/showProducts/ShowProducts.jsx";
import ShowOrders from "./components/seller/showOrders/ShowOrders.jsx";

import UserPage from "./pages/userPage/UserPage.jsx";
import UserProfile from "./components/user/userProfile/UserProfile.jsx";
import UserAddress from "./components/user/userAddress/UserAddress.jsx";
import UserWishlist from "./components/user/userWishlist/UserWishlist.jsx";
import UserOrders from "./components/user/userOrders/UserOrders.jsx";
import ChangePassword from "./components/user/changePassword/ChangePassword.jsx";
import OrderPage from "./pages/orderPage/OrderPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },

      {
        path: "product",
        children: [
          {
            path: ":productName",
            element: <ProductPage />,
          },
        ],
      },

      {
        path: "cart",
        element: <CartPage />,
      },

      {
        path:"paymentsuccess",
        element:<OrderPage/>
        
       
      },

      {
        path: "account",
        children: [
          {
            path: ":auth",
            element: <Auth></Auth>,
          },
        ],
      },

      {
        path: "user",
        element: <UserPage />,
        children: [
          {
            index: true,
            element: <UserProfile />,
          },

          {
            path: "profile",
            element: <UserProfile />,
          },

          {
            path: "address",
            element: <UserAddress />,
          },

          {
            path: "wishlist",
            element: <UserWishlist />,
          },

          {
            path: "orders",
            element: <UserOrders />,
          },

          {
            path: "changePassword",
            element: <ChangePassword />,
          },
        ],
      },

      {
        path: "seller-dashboard",
        element: <SellerPage></SellerPage>,
        children: [
          {
            index: true,
            element: <ShowProducts></ShowProducts>,
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
            path: "orders",
            element: <ShowOrders />,
          },

          {
            path: "update-product",
            children: [
              {
                path: ":productName",
                element: <CreateProduct></CreateProduct>,
              },
            ],
          },
        ],
      },

      {
        path: "collections",
        children: [
          {
            path: ":category",
            element: <ProductListPage />,
          },
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
