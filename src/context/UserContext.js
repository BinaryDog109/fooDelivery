import { createContext } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  return (
    <UserContext.Provider value={{ id: "Mbsj4jfzNKIfoT2KKPPJ" }}>
      {children}
    </UserContext.Provider>
  );
};
