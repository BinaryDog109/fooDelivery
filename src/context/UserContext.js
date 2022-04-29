import { createContext, useEffect, useState } from "react";
import { useCRUD } from "../hooks/useCRUD";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const id = "jqujejy9RKZCYLILWq6V";

  const { getDoc, response } = useCRUD("Users");
  // Get user's cart
  useEffect(() => {
    getDoc(id);
  }, [getDoc]);
  const context = {id, ...response.document}
  // Restaurant manager context
  // const id = "Mbsj4jfzNKIfoT2KKPPJ";
  // const { docs: orders, error: orderError } = useGetDocuments(
  //   "Orders",
  //   null,
  //   null,
  //   ["restaurantId", "==", id],
  //   ["createdAt", "desc"]
  // );
  // const context = {id, orders, orderError}
  return (
    <UserContext.Provider value={{ ...context }}>
      {response.error}
      {children}
    </UserContext.Provider>
  );
};
