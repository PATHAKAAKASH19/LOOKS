import { StrictMode,lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Spinner from "./components/ui/spinner/Spinner.jsx";

const App = lazy(() => import("./App.jsx"));
const HomePage = lazy(() => import("./pages/homePage/HomePage.jsx"));
const ProductListPage = lazy(() => import("./pages/productListPage/ProductListPage.jsx"));
const ProductPage = lazy(() => import("./pages/productPage/ProductPage.jsx"));
const CartPage = lazy(() => import("./pages/cartPage/CartPage.jsx"));

const Auth = lazy(() => import("./pages/authPage/Auth.jsx"));
const ErrorPage = lazy(() => import("./pages/errorPage/ErrorPage.jsx"));

const SellerPage = lazy(() => import("./pages/sellerPage/SellerPage.jsx"));
const CreateCategory = lazy(() =>import("./components/seller/createCategory/CreateCategory.jsx"))
const CreateProduct = lazy(() =>import("./components/seller/createProduct/CreateProduct.jsx"));
const ShowProducts = lazy(() =>import("./components/seller/showProducts/ShowProducts.jsx")) ;
const ShowOrders = lazy(() =>import("./components/seller/showOrders/ShowOrders.jsx")) ;

const UserPage = lazy(() =>import("./pages/userPage/UserPage.jsx"));
const UserProfile = lazy(() =>import("./components/user/userProfile/UserProfile.jsx")) ;
const UserAddress = lazy(() =>import("./components/user/userAddress/UserAddress.jsx")) ;
const UserWishlist = lazy(() =>import("./components/user/userWishlist/UserWishlist.jsx")) ;
const UserOrders = lazy(() =>import("./components/user/userOrders/UserOrders.jsx")) ;
const ChangePassword = lazy(() =>import("./components/user/changePassword/ChangePassword.jsx")) ;
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
    element: <App />,
    errorElement:<LazyComponent component={ErrorPage}/>,
    children: [
      {
        path: "",
        element:<LazyComponent component={HomePage}/>,
       
      },

      {
        path: "product",
        children: [
          {
            path: ":productName",
            element: <LazyComponent component={ProductPage}/>,
          },
        ],
      },

      {
        path: "cart",
        element: <LazyComponent component={CartPage}/>,
      },

      {
        path:"paymentsuccess",
        element: <LazyComponent component={OrderPage}/>,
        
       
      },

      {
        path: "account",
        children: [
          {
            path: ":auth",
            element:  <LazyComponent component={Auth}/>,
          },
        ],
      },

      {
        path: "seller",
        children: [
          {
            path: ":auth",
            element:  <LazyComponent component={SellerAuth}/>,
          },
        ],
      },

      {
        path: "user",
        element:  <LazyComponent component={UserPage}/>,
        children: [
          {
            index: true,
            element: <LazyComponent component={UserProfile }/>,
          },

          {
            path: "profile",
            element:  <LazyComponent component={UserProfile }/>,
          },

          {
            path: "address",
            element: <LazyComponent component={UserAddress}/>,
          },

          {
            path: "wishlist",
            element:  <LazyComponent component={UserWishlist}/>,
          },

          {
            path: "orders",
            element:  <LazyComponent component={UserOrders}/>,
          },

          {
            path: "changePassword",
            element: <LazyComponent component={ChangePassword}/>,
          },
        ],
      },

      {
        path: "seller-dashboard",
        element: <LazyComponent component={SellerPage}/>,
        children: [
          {
            index: true,
            element: <LazyComponent component={ShowProducts}/>,
          },
          {
            path: "create-category",
            element: <LazyComponent component={CreateCategory}/>,
          },
          {
            path: "create-product",
            element: <LazyComponent component={CreateProduct}/>,
          },

          {
            path: "products",
            element: <LazyComponent component={ShowProducts}/>,
          },

          {
            path: "orders",
            element:  <LazyComponent component={ShowOrders}/>,
          },

          {
            path: "update-product",
            children: [
              {
                path: ":productName",
                element: <LazyComponent component={CreateProduct}/>,
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
            element: <LazyComponent component={ProductListPage}/> ,
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
