import { createContext, useMemo } from "react";
import { useGetDocuments } from "../hooks/useGetDocuments";
import { useRestaurant } from "../hooks/useRetaurant";
import { useUserContext } from "../hooks/useUserContext";

export const RestaurantOrderContext = createContext();
export const RestaurantOrderContextProvider = ({ children }) => {
  const { restaurantId } = useUserContext();
  const query = useMemo(() => ["restaurantId", "==", restaurantId], [restaurantId])
  const { docs: orders, error } = useGetDocuments(
    "Orders",
    null,
    null,
    query,
    ["createdAt", "desc"],
    false
  );

  const { restaurantInfo } = useRestaurant(restaurantId);
  const context = { id: restaurantId, orders, error, restaurantInfo };
  return (
    orders &&
    restaurantInfo && (
      <RestaurantOrderContext.Provider value={{ ...context }}>
        {children}
      </RestaurantOrderContext.Provider>
    )
  );
};
