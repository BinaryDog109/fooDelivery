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
import { DisplayMap } from "./DisplayMap";

export const MapModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  

  return (
    <>
      <Button onClick={onOpen}>Track location</Button>

      <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Track Your Food</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box minHeight={300} height={500}>
              <DisplayMap />
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
