import { createContext, useEffect, useState } from "react";
import { useCRUD } from "../hooks/useCRUD";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const id = "jqujejy9RKZCYLILWq6V"; // User Auth Id
  // A hard-coded delivery person id
  const deliveryId = "3teqWWAAhZQjzyd0AAYJ"
  const { getDoc, updateDoc: updateUser, response } = useCRUD("Users");
  // Get user's info
  // Todo: After a user has signed up, create a cart for the user
  useEffect(() => {
    getDoc(deliveryId);
  }, [getDoc]);
  const context = {deliveryId, id, updateUser, response }
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
