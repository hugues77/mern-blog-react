import { createContext, useState } from "react";

export const UserContext = createContext(); //Creation du context

//Initialisation
const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
