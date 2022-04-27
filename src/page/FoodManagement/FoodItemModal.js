import { Button } from "@chakra-ui/react";
import { FoodItemForm } from "./FoodItemForm";
import { HighModal } from "../../components/HighModal";
import { useRestaurantAddDeleteUpdate } from "../../hooks/useRestaurantAddDeleteUpdate";

// Wraps a HighModal and inserts a FoodItemForm
export const FoodItemModal = ({ isOpen, onClose, onOpen }) => {

  const id = "Mbsj4jfzNKIfoT2KKPPJ"
  const {addDoc, deleteDoc, updateDoc, getDoc} = 
  useRestaurantAddDeleteUpdate("Restaurants", id, "Food")
  
  const handleClick = () => {
    const data = {
      description: 'StarBug',
      name: 'baobao',
      price: "79.99"
    }
    getDoc("MtofPnkfLV2jNTi2pPFH")
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
