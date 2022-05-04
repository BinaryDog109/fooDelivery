import { useContext } from "react"
import { RestaurantOrderContext } from "../context/RestaurantOrderContext"

export const useRestaurantOrderContext = () => {
  const context = useContext(RestaurantOrderContext)

  if(!context) {
    throw Error('useRestaurantOrderContext must be used inside an RestaurantOrderContext')
  }

  return context
}