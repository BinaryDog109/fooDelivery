import { Box, Button, Divider } from "@chakra-ui/react";
import { useEffect } from "react";
import { DisplayMap } from "../../components/DisplayMap";
import { MyThemeButton } from "../../components/MyThemeButton";
import { useCRUD } from "../../hooks/useCRUD";
import { useUserContext } from "../../hooks/useUserContext";
export const OrderTrackingCard = () => {
  const { response: deliveryUser } = useUserContext();
  const { getDoc: getOrder, response: orderResponse } = useCRUD("Orders");
  const { getDoc: getRestaurant, response: restaurantResponse } =
    useCRUD("Restaurants");
  // Got the order Id
  const alreadyhasOrder =
    deliveryUser.document && deliveryUser.document.hasOrder;


  // Got the restaurant Id
  const alreadyHasRestaurant =
    alreadyhasOrder &&
    orderResponse.document &&
    orderResponse.document.restaurantId;

  useEffect(() => {
    if (alreadyhasOrder) {
      getOrder(alreadyhasOrder);
    }
  }, [alreadyhasOrder, getOrder]);

  useEffect(() => {
    if (alreadyHasRestaurant) {
      getRestaurant(alreadyHasRestaurant);
    }
  }, [alreadyHasRestaurant, getRestaurant]);

  return (
    alreadyhasOrder &&
    alreadyHasRestaurant && restaurantResponse.document && (
      <>
        Here is your active order:
        <Box>
          <DisplayMap
            order={orderResponse.document}
            restaurant={restaurantResponse.document}
            orderId={alreadyhasOrder}
          />
        </Box>
        <Divider></Divider>
        <MyThemeButton size={"sm"} mt={2}>Confirm Food Delivered</MyThemeButton>
      </>
    )
  );
};
