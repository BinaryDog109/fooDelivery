import { Button, useToast } from "@chakra-ui/react";
import { RestaurantItemForm } from "./RestaurantItemForm";
import { HighModal } from "../../components/HighModal";
import { useCRUD } from "../../hooks/useCRUD";
import { useUserContext } from "../../hooks/useUserContext";
import { useEffect, useMemo, useState } from "react";
// Wraps a HighModal and inserts a FoodItemForm
export const RestaurantItemModal = ({ data, isOpen, onClose, onOpen }) => {
    const { id } = useUserContext();
    const { addDoc, updateDoc, response } = useCRUD("Restaurants", id, "Food");
    const toast = useToast();
    // foodInfo is a state to be bound to form controls
    const initRestaurantInfo = useMemo(
        () => ({
            name: "",
            price: "",
            description: "",
        }),
        []
    );
    const [foodInfo, setFoodInfo] = useState(
        data ? { ...data } : { ...initRestaurantInfo }
    );
    // Handles the operations' response: resets the form if success, displays a toast
    useEffect(() => {
        if (response.success === "added") {
            toast({
                title: "Food added.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setFoodInfo({ ...initRestaurantInfo });
        }
        else if (response.success === "updated") {
            toast({
                title: "Food list updated.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            onClose()
        }
    }, [response.success, initRestaurantInfo, toast, onClose]);
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
                        <Button
                            form="food-item-form"
                            type="submit"
                            isLoading={response.isPending}
                            isDisabled={response.isPending}
                            // onClick={() => handleSubmit()}
                            colorScheme="green"
                        >
                            Submit
                        </Button>
                    </>
                }
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
            >
                <RestaurantItemForm
                    foodId={data && data.id}
                    uid={id}
                    addDoc={addDoc}
                    updateDoc={updateDoc}
                    setFoodInfo={setFoodInfo}
                    foodInfo={foodInfo}
                />
            </HighModal>
        </>
    );
};
