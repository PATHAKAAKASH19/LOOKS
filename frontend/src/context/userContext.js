import { Children, createContext, useContext, useState } from "react";

const authContext = createContext();

export const authContextProvider = ({ Children }) => {
  const [accessToken, setAccessToken] = useState("");
  const [userData, setuserData] = useState(false);

 
  const logIn = () => {
    
  }

  const logOut = () => {

  }

  return (<authContext.Provider value={{isAuthenticated, logOut, logIn}}>{Children}</authContext.Provider>);
};

export const useAuth = () => useContext(authContext);