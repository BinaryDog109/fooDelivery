// An easy encapsulation of the Chakra Modal component (with max-height: 100%)
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
export const HighModal = ({
  OpenButton,
  ActionButtons,
  isOpen,
  onClose,
  onOpen,
  children
}) => {
  return (
    <>
      {OpenButton}
      <Modal
        size={"xl"}
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount={false}
        scrollBehavior={"inside"}
      >
        <ModalOverlay />
        <ModalContent maxH={"100%"}>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {children}
          </ModalBody>

          <ModalFooter>{ActionButtons}</ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
