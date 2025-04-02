import { createContext, useContext, useState } from "react";

const CartInfoContext = createContext();

export const CartInfoContextProvider = ({ children }) => {
  const [cartInfo, setCartInfo] = useState(null);

  return (
    <CartInfoContext.Provider value={{ cartInfo, setCartInfo }}>
      {children}
    </CartInfoContext.Provider>
  );
};

export const useCartInfo = () => useContext(CartInfoContext);