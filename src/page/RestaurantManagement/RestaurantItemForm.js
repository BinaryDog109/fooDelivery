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
} from "@chakra-ui/react";
import styles from "./RestaurantItemForm.module.css";

export const RestaurantItemForm = ({
                                       uid,
                                       addDoc,
                                       setRestaurantInfo,
                                       restaurantInfo,
                                       restaurantId,
                                       deleteDoc,
                                       updateDoc,
                                   }) => {
    const handleChange = (event) => {
        if (typeof event === "string") {
            setRestaurantInfo((prev) => ({ ...prev, price: event }));
        } else {
            const { id, value } = event.target;

            setRestaurantInfo((prev) => ({ ...prev, [id]: value }));
        }
    };
    const handleSubmit = (event, restaurantId) => {
        event.preventDefault();
        // Adding doc
        if (!restaurantId) {
            addDoc({
                ...restaurantInfo,
                uid,
            });
        }
        // Update doc
        else {
            console.log("will update...")
            updateDoc(restaurantId, {
                ...restaurantInfo,
                uid
            })
        }
    };

    return (
        <>
            <form onSubmit={(event) => handleSubmit(event, restaurantInfo)} id="food-item-form">
                <Image
                    className={styles.image}
                    src="https://images.unsplash.com/photo-1612927601601-6638404737ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                />
                <Flex justify={"space-between"}>
                    <FormControl isRequired>
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Input id="name" onChange={handleChange} value={restaurantInfo.name} />
                    </FormControl>

                    <FormControl isRequired w={"50%"} ml={5}>
                        <FormLabel htmlFor="price">Price</FormLabel>
                        <NumberInput
                            id="price"
                            onChange={handleChange}
                            min={0}
                            precision={2}
                            value={restaurantInfo.price}
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
                        value={restaurantInfo.description}
                        h={"120px"}
                        placeholder="How good is this food? 😀"
                    />
                </FormControl>
            </form>
        </>
    );
};
