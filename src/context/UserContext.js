import { createContext } from "react";
import { useGetDocuments } from "../hooks/useGetDocuments";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const id = "Mbsj4jfzNKIfoT2KKPPJ"
  const { docs: orders, error: orderError } = useGetDocuments("Orders", null, null, [
    "restaurantId",
    "==",
    id
  ]);
  return (
    <UserContext.Provider value={{ id, orders, orderError }}>
      {children}
    </UserContext.Provider>
  );
};
