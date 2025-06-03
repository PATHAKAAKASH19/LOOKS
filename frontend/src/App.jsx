import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { Outlet } from "react-router-dom";


import { AuthContextProvider } from "./context/AuthContext.jsx";
import { UserInfoContextProvider } from "./context/UserInfoContext.jsx";
import { SellerAuthContextProvider } from "./context/SellerAuthContext.jsx";
import { CartInfoContextProvider } from "./context/cartContext.jsx";

export default function App() {
  return (
    <AuthContextProvider>
      <SellerAuthContextProvider>
      <UserInfoContextProvider>
        <CartInfoContextProvider>
          <Header />
          <Outlet />
          <Footer />
          </CartInfoContextProvider>
      </UserInfoContextProvider>
      </SellerAuthContextProvider>
    </AuthContextProvider>
  );
}
