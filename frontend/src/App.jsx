import React from "react";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { Outlet } from "react-router-dom";

import { authContextProvider } from "./context/userContext";

export default function App() {
  return (
    <authContextProvider>
      <Header />
      <Outlet />
      <Footer />
    </authContextProvider>
  );
}
