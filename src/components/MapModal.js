import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import { useCRUD } from "../hooks/useCRUD";
import { CustomerDisplayMap } from "../page/Customer/CustomerDisplayMap";

export const MapModal = ({ order }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deliveryLocation, postCode: customerPostCode } = order;
  const { updateDoc, response } = useCRUD("Orders");
  const handleOnOpen = (e) => {
    onOpen(e);
    updateDoc(order.id, {
      userWantsToUpdate: !order.userWantsToUpdate,
    });
  };
  return (
    <>
      <Button onClick={handleOnOpen}>Track location</Button>

      <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Track Your Food</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box minHeight={300} height={500}>
              {deliveryLocation ? (
                <CustomerDisplayMap
                  deliveryLat={deliveryLocation.lat}
                  deliveryLng={deliveryLocation.lng}
                  customerPostCode={customerPostCode}
                />
              ) : (
                "Waiting to fetch delivery person's location..."
              )}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Looks good!</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
