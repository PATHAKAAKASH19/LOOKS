import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState("");
  const [userId, setUserID] = useState("")

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, setUserID, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
