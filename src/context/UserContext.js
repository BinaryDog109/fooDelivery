import { createContext, useEffect, useRef, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCRUD } from "../hooks/useCRUD";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const { user, authType } = useAuthContext();
  const [unsubFunction, setUnsubFunction] = useState(null);
  const uid = user && user.uid;
  const {
    getDoc: getUserInfo,
    updateDoc: updateUser,
    response,
  } = useCRUD("Users");
  // Prevent an infinite loop
  useEffect(() => {
    if (uid) {
      const unsub = getUserInfo(uid);
      // Do not directly store unsub - React will think it is a prev-state callback!
      setUnsubFunction(() => unsub);
    }
  }, [getUserInfo, uid]);
  // If a user log out, detach its listener on the document
  useEffect(() => {
    if (authType === "LOGOUT" && unsubFunction) {
      console.log("detaching the listner");
      unsubFunction();
    }
  }, [authType, unsubFunction]);

  const userInfo = user && response.document;
  const roles = userInfo && userInfo.roles;
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

