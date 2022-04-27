import { Button } from "@chakra-ui/react";
import { FoodItemForm } from "./FoodItemForm";
import { HighModal } from "../../components/HighModal";
import { useCRUD } from "../../hooks/useCRUD";
import { useUserContext } from "../../hooks/useUserContext";
import { useState } from "react";

// Wraps a HighModal and inserts a FoodItemForm
export const FoodItemModal = ({ data, isOpen, onClose, onOpen }) => {
  const { userId } = useUserContext();
  const { addDoc, updateDoc } = useCRUD("Restaurants", userId, "Food");
  const handleSubmit = (foodId) => {
    if (!foodId) {
      addDoc();
    }
  };
  const [foodInfo, setFoodInfo] = useState(
    data
      ? { ...data }
      : {
          name: "",
          price: "",
          description: "",
        }
  );
        if (!data) console.log(foodInfo)
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
            <Button onClick={() => handleSubmit()} colorScheme="green">
              Submit
            </Button>
          </>
        }
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      >
        <FoodItemForm setFoodInfo={setFoodInfo} foodInfo={foodInfo} />
      </HighModal>
    </>
  );
};
