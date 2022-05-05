import { useEffect, useState } from "react";
import { useCRUD } from "./useCRUD";

export const useRestaurant = (restaurantId) => {
  const { getDoc, response } = useCRUD("Restaurants");
  const [unsubFunction, setUnsubFunction] = useState(null);
  // Get the restaurant info
  useEffect(() => {
    const unsub = getDoc(restaurantId);
    setUnsubFunction(()=>unsub)
  }, [getDoc, restaurantId]);
  const restaurantInfo = response.document;

  return {restaurantInfo, getRestaurantResponse: response, unsubFunction};
};
