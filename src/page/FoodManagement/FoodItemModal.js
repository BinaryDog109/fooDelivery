import { Button } from "@chakra-ui/react";
import { FoodItemForm } from "./FoodItemForm";
import { HighModal } from "../../components/HighModal";

// Wraps a HighModal and inserts a FoodItemForm
export const FoodItemModal = ({ isOpen, onClose, onOpen }) => {
  return (
    <>
      <HighModal
        ActionButtons={
          <>
            <Button
              colorScheme="red"
              variant={"ghost"}
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
            <Button colorScheme="green">Submit</Button>
          </>
        }
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      >
        <FoodItemForm />
      </HighModal>
    </>
  );
};
