import { createContext, useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCRUD } from "../hooks/useCRUD";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const { user } = useAuthContext();
  const uid = user && user.uid;
  const {
    getDoc: getUserInfo,
    updateDoc: updateUser,
    response,
  } = useCRUD("Users");
  // Prevent an infinite loop
  useEffect(() => {
    if (uid) {
      getUserInfo(uid);
    }
  }, [getUserInfo, uid]);

  const userInfo = user && response.document;
  const roles = userInfo && userInfo.roles;
  // console.log(roles)
  //  Get the restaurant this user creates if any
  const restaurantId = userInfo && userInfo.restaurantId;

  const context = { id: uid, roles, updateUser, response, restaurantId };

  // Ensure roles has been resolved before rendering the children
  return roles && roles === "manager" ? (
    restaurantId && (
      <UserContext.Provider value={{ ...context }}>
        {children}
      </UserContext.Provider>
    )
  ) : roles ? (
    <UserContext.Provider value={{ ...context }}>
      {children}
    </UserContext.Provider>
  ) : (
    <UserContext.Provider value={{ roles: "guest" }}>
      {children}
    </UserContext.Provider>
  );
};

// // const id = "jqujejy9RKZCYLILWq6V"; // User Auth Id
// // const id = "Rnel0gMCSsIf8OGX0KZ4"
// const id = "Rnel0gMCSsIf8OGX0KZ4" // User Auth Id 2 (to test delivery)
// // A hard-coded delivery person id
// create a hasOrder field after a driver signs up
// const deliveryId = "3teqWWAAhZQjzyd0AAYJ"
// const { getDoc, updateDoc: updateUser, response } = useCRUD("Users");
// // Get user's info
// // Todo: After a user has signed up, create a cart for the user
// useEffect(() => {
//   // getDoc(deliveryId);
//   getDoc(id)
// }, [getDoc]);

// Restaurant manager context
// const id = "Mbsj4jfzNKIfoT2KKPPJ";
// const { docs: orders, error: orderError } = useGetDocuments(
//   "Orders",
//   null,
//   null,
//   ["restaurantId", "==", id],
//   ["createdAt", "desc"]
// );
// const {restaurantInfo} = useRestaurant(id)
// const context = {id, orders, orderError, restaurantInfo}
// return restaurantInfo && (
