import { Button } from "@chakra-ui/react";
import { FoodItemForm } from "./FoodItemForm";
import { HighModal } from "../../components/HighModal";
import { useRestaurantAddDeleteUpdate } from "../../hooks/useRestaurantAddDeleteUpdate";

// Wraps a HighModal and inserts a FoodItemForm
export const FoodItemModal = ({ isOpen, onClose, onOpen }) => {

  const {addDoc, deleteDoc, updateDoc} = useRestaurantAddDeleteUpdate("Food")
  
  const handleClick = () => {
    const data = {
      description: 'StarBug',
      name: 'baobao',
      price: "79.99"
    }
    addDoc(data)
  }
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
            <Button onClick={()=>handleClick()} colorScheme="green">Submit</Button>
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
