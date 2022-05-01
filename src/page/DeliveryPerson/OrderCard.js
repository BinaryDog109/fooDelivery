import { useRef } from "react";
import {
  Flex,
  useColorModeValue,
  chakra,
  Box,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useRestaurant } from "../../hooks/useRetaurant";
import { OperationAlertDialog } from "../../components/OperationAlertDialog";
import { useUserContext } from "../../hooks/useUserContext";
import { useCRUD } from "../../hooks/useCRUD";
import { projectFirestore, timestamp } from "../../firebase/config";
export const OrderCard = ({ data }) => {
  const { restaurantInfo } = useRestaurant(data.restaurantId);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const { deliveryId, response: deliveryUser } = useUserContext();
  const handleTakingOrder = async () => {
    const updatedAt = timestamp.fromDate(new Date());
    //   Btach update in two collections
    const batch = projectFirestore.batch();
    const orderRef = projectFirestore.collection("Orders").doc(data.id);
    batch.update(orderRef, {
      status: "Paid",
      deliverBy: deliveryId,
      updatedAt,
    });
    const deliverRef = projectFirestore.collection("Users").doc(deliveryId);
    batch.update(deliverRef, {
      hasOrder: data.id,
      updatedAt,
    });
    await batch.commit();
    console.log("update successful");

    onClose();
  };

  return (
    <>
      <OperationAlertDialog
        isOpen={isOpen}
        cancelRef={cancelRef}
        onClose={onClose}
        title="Ready to take this order?"
        text="Remember to say hi to your customer!"
      >
        {/* cancelRef to put an outline on the button */}
        <Button ref={cancelRef} onClick={onClose}>
          Cancel
        </Button>
        <Button
          colorScheme="red"
          onClick={() => {
            handleTakingOrder();
          }}
          ml={3}
        >
          Accept
        </Button>
      </OperationAlertDialog>
      <Box
        mx="auto"
        py={4}
        px={8}
        bg={useColorModeValue("white", "gray.800")}
        shadow="lg"
        rounded="lg"
      >
        <chakra.h3
          color={useColorModeValue("gray.800", "white")}
          fontSize={{ base: "xl", md: "2xl" }}
          mt={{ base: 2, md: 0 }}
          fontWeight="bold"
        >
          Order from {restaurantInfo && restaurantInfo.name}
        </chakra.h3>

        <chakra.p mt={2} color={useColorModeValue("gray.600", "gray.200")}>
          Customer postal code: {data.postCode}
        </chakra.p>

        <Flex justifyContent="end" mt={4}>
          <Button onClick={onOpen} colorScheme={"green"}>
            Accept
          </Button>
        </Flex>
      </Box>
    </>
  );
};
