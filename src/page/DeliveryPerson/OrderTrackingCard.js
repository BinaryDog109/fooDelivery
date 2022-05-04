import { Box, Button, Divider, useDisclosure } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { DisplayMap } from "../../components/DisplayMap";
import { MyThemeButton } from "../../components/MyThemeButton";
import { OperationAlertDialog } from "../../components/OperationAlertDialog";
import { projectFirestore, timestamp } from "../../firebase/config";
import { useCRUD } from "../../hooks/useCRUD";
import { useUserContext } from "../../hooks/useUserContext";
export const OrderTrackingCard = () => {
  const { response: deliveryUser, id: deliveryId } = useUserContext();
  const { getDoc: getOrder, response: orderResponse } = useCRUD("Orders");
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
  
  const handleClick = async () => {
    if (!alreadyhasOrder) return;
    const updatedAt = timestamp.fromDate(new Date());
    //   Btach update in two collections
    const batch = projectFirestore.batch();
    const orderRef = projectFirestore.collection("Orders").doc(alreadyhasOrder);
    batch.update(orderRef, {
      status: "Delivered",
      deliveryLocation: null,
      updatedAt,
    });
    const deliverRef = projectFirestore.collection("Users").doc(deliveryId);
    batch.update(deliverRef, {
      hasOrder: null,
      updatedAt,
    });
    await batch.commit();
    console.log("update successful");

    onClose();
  };
  return (
    alreadyhasOrder &&
    alreadyHasRestaurant &&
    restaurantResponse.document && (
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
        <OperationAlertDialog
          isOpen={isOpen}
          cancelRef={cancelRef}
          onClose={onClose}
          title="Food delivered?"
          text="You are about to confirm you have delivered the food"
        >
          <Button ref={cancelRef} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="red"
            onClick={() => {
              handleClick();
            }}
            ml={3}
          >
            Confirm
          </Button>
        </OperationAlertDialog>
        <MyThemeButton onClick={onOpen} size={"sm"} mt={2}>
          Confirm Food Delivered
        </MyThemeButton>
      </>
    )
  );
};
