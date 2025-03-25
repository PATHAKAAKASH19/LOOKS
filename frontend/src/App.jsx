import React from "react";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { Outlet } from "react-router-dom";


import { AuthContextProvider } from "./context/AuthContext.jsx";
import { UserInfoContextProvider } from "./context/UserInfoContext.jsx";

export default function App() {
  return (
    <AuthContextProvider>
      <UserInfoContextProvider>
        
          <Header />
          <Outlet />
          <Footer />
       
      </UserInfoContextProvider>
    </AuthContextProvider>
  );
}
