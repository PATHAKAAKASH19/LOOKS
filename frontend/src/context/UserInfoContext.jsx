import { createContext, useContext, useState } from "react";

const UserInfoContext = createContext();

export const UserInfoContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
};

export const useUserInfo = () => useContext(UserInfoContext);
