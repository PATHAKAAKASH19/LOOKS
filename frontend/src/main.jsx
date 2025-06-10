import { StrictMode,lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Spinner from "./components/ui/spinner/Spinner.jsx";


import App from "./App.jsx"
const HomePage = lazy(() => import("./pages/homePage/HomePage.jsx"));
const ProductListPage = lazy(() => import("./pages/productListPage/ProductListPage.jsx"));
const ProductPage = lazy(() => import("./pages/productPage/ProductPage.jsx"));
const CartPage = lazy(() => import("./pages/cartPage/CartPage.jsx"));

const Auth = lazy(() => import("./pages/authPage/Auth.jsx"));
const ErrorPage = lazy(() => import("./pages/errorPage/ErrorPage.jsx"));

const SellerPage = lazy(() => import("./pages/sellerPage/SellerPage.jsx"));
import CreateCategory from "./components/seller/createCategory/CreateCategory.jsx";
import CreateProduct from "./components/seller/createProduct/CreateProduct.jsx";
import ShowProducts from "./components/seller/showProducts/ShowProducts.jsx";
import ShowOrders from "./components/seller/showOrders/ShowOrders.jsx";

const UserPage = lazy(() => import("./pages/userPage/UserPage.jsx"));
import UserProfile from "./components/user/userProfile/UserProfile.jsx";
import UserAddress from "./components/user/userAddress/UserAddress.jsx";
import UserWishlist from "./components/user/userWishlist/UserWishlist.jsx"
import UserOrders from "./components/user/userOrders/UserOrders.jsx";
import ChangePassword from "./components/user/changePassword/ChangePassword.jsx";
const OrderPage= lazy(() =>import("./pages/orderPage/OrderPage.jsx"));
const SellerAuth = lazy(() =>import("./pages/authPage/SellerAuth.jsx")) ;


const LazyComponent = ({component:Component}) => {
  return (
    <Suspense fallback={<Spinner/>}>
    <Component />
  </Suspense>
  )
}


const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <LazyComponent component={ErrorPage} />,
    element: <App />,

    children: [
      {
        path: "",
        errorElement: <LazyComponent component={ErrorPage} />,
        element: <LazyComponent component={HomePage} />,
      },

      {
        path: "product",
        errorElement: <LazyComponent component={ErrorPage} />,
        children: [
          {
            path: ":productName",
            element: <LazyComponent component={ProductPage} />,
          },
        ],
      },

      {
        path: "cart",
        errorElement: <LazyComponent component={ErrorPage} />,
        element: <LazyComponent component={CartPage} />,
      },

      {
        path: "paymentsuccess",
        errorElement: <LazyComponent component={ErrorPage} />,
        element: <LazyComponent component={OrderPage} />,
      },

      {
        path: "account",

        errorElement: <LazyComponent component={ErrorPage} />,
        children: [
          {
            path: ":auth",
            element: <LazyComponent component={Auth} />,
          },
        ],
      },

      {
        path: "seller",
        errorElement: <LazyComponent component={ErrorPage} />,
        children: [
          {
            path: ":auth",
            element: <LazyComponent component={SellerAuth} />,
          },
        ],
      },

      {
        path: "user",
        errorElement: <LazyComponent component={ErrorPage} />,
        element: <LazyComponent component={UserPage} />,
        children: [
          {
            index: true,
            element:<UserProfile/>,
          },

          {
            path: "profile",
            element: <UserProfile/>,
          },

          {
            path: "address",
            element: <UserAddress/>,
          },

          {
            path: "wishlist",
            element: <UserWishlist/>,
          },

          {
            path: "orders",
            element: <UserOrders/>,
          },

          {
            path: "changePassword",
            element: <ChangePassword></ChangePassword>,
          },
        ],
      },

      {
        path: "seller-dashboard",
        errorElement: <LazyComponent component={ErrorPage} />,
        element: <LazyComponent component={SellerPage} />,
        children: [
          {
            index: true,
            element: <ShowProducts/>,
          },
          {
            path: "create-category",
            element: <CreateCategory/>,
          },
          {
            path: "create-product",
            element: <CreateProduct/>,
          },

          {
            path: "products",
            element: <ShowProducts/>,
          },

          {
            path: "orders",
            element: <ShowOrders/>,
          },

          {
            path: "update-product",
            children: [
              {
                path: ":productName",
                element: <CreateProduct/>,
              },
            ],
          },
        ],
      },

      {
        path: "collections",
        errorElement: <LazyComponent component={ErrorPage} />,
        children: [
          {
            path: ":category",
            element: <LazyComponent component={ProductListPage} />,
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
