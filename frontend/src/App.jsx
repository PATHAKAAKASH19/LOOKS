import React from "react";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { Outlet } from "react-router-dom";

import { AuthContextProvider } from "./context/authContext.jsx";

export default function App() {
  return (
    <AuthContextProvider>
      <Header />
      <Outlet />
      <Footer />
    </AuthContextProvider>
  );
}
