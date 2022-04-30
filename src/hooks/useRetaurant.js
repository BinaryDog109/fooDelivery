import { useEffect } from "react";
import { useCRUD } from "./useCRUD";

export const useRestaurant = (restaurantId) => {
  const { getDoc, response } = useCRUD("Restaurants");
  // Get the restaurant info
  useEffect(() => {
    getDoc(restaurantId);
  }, [getDoc, restaurantId]);
  const restaurantInfo = response.document;

  return {restaurantInfo, getRestaurantResponse: response};
};
