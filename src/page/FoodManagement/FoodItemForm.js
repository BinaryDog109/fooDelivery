import {
  Image,
  Input,
  NumberInput,
  NumberInputField,
  Flex,
  Textarea,
  Text,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useCRUD } from "../../hooks/useCRUD";
import { useUserContext } from "../../hooks/useUserContext";
import { useEffect } from "react";
import styles from "./FoodItemForm.module.css";

export const FoodItemForm = ({
  uid,
  addDoc,
  setFoodInfo,
  foodInfo,
  foodId,
  deleteDoc,
  updateDoc,
}) => {
  const { orders, restaurantInfo } = useUserContext();
  const purchasedUsers = orders.map((order) => ({ userId: order.uid }));
  const uniqPurchasedUsers = purchasedUsers.filter(
    (v, i, a) => a.findIndex((v2) => v2.userId === v.userId) === i
  );
  const usersAndHasRead = uniqPurchasedUsers.map((elem) => ({
    id: elem.userId,
    hasRead: false,
  }));
  const { addDoc: addNotification, response } = useCRUD("Notification");
  const handleChange = (event) => {
    if (typeof event === "string") {
      setFoodInfo((prev) => ({ ...prev, price: event }));
    } else {
      const { id, value } = event.target;

      setFoodInfo((prev) => ({ ...prev, [id]: value }));
    }
  };
  const handleSubmit = (event, foodId) => {
    event.preventDefault();
    // Adding doc
    if (!foodId) {
      addDoc({
        ...foodInfo,
        uid,
      });
    }
    // Update doc
    else {
      console.log("will update...");
      updateDoc(foodId, {
        ...foodInfo,
        uid,
      });
      addNotification({
        content: `${foodInfo.name} from the ${restaurantInfo.name} has changed!`,
        users: usersAndHasRead,
      });
    }
  };
  // Check if successs
  const toast = useToast();
  useEffect(() => {
    if (response.success) {
      toast({
        title: "Notification added.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [response.success, toast]);

  return (
    <>
      <form
        onSubmit={(event) => handleSubmit(event, foodId)}
        id="food-item-form"
      >
        <Image
          className={styles.image}
          src="https://images.unsplash.com/photo-1612927601601-6638404737ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        />
        <Flex justify={"space-between"}>
          <FormControl isRequired>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input id="name" onChange={handleChange} value={foodInfo.name} />
          </FormControl>

          <FormControl isRequired w={"50%"} ml={5}>
            <FormLabel htmlFor="price">Price</FormLabel>
            <NumberInput
              id="price"
              onChange={handleChange}
              min={0}
              precision={2}
              value={foodInfo.price}
            >
              <NumberInputField />
              {/* <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper> */}
            </NumberInput>
          </FormControl>
        </Flex>
        <FormControl mt={2}>
          <Text fontWeight={400} mb="8px">
            Description:
          </Text>
          <Textarea
            id="description"
            onChange={handleChange}
            value={foodInfo.description}
            h={"120px"}
            placeholder="How good is this food? 😀"
          />
        </FormControl>
      </form>
    </>
  );
};
