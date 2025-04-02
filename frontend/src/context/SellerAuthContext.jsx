import { createContext, useContext, useState } from "react";

const SellerAuthContext = createContext();

export const SellerAuthContextProvider = ({ children }) => {
  const [sellerToken, setSellerToken] = useState("");
 

  return (
    <SellerAuthContext.Provider value={{sellerToken, setSellerToken}}>
      {children}
    </SellerAuthContext.Provider>
  );
};

export const useSellerAuth = () => useContext(SellerAuthContext);