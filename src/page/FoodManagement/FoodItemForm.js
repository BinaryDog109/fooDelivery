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
import styles from "./FoodItemForm.module.css";

export const FoodItemForm = () => {
  return (
    <>
      <Image
        className={styles.image}
        src="https://images.unsplash.com/photo-1612927601601-6638404737ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
      />
      <Flex justify={"space-between"}>
        <FormControl>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input id="name" />
        </FormControl>

        <FormControl w={"50%"} ml={5}>
          <FormLabel htmlFor="price">Price</FormLabel>
          <NumberInput min={0} precision={2}>
            <NumberInputField id="price" />
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
        <Textarea h={"120px"} placeholder="How good is this food? 😀" />
      </FormControl>
    </>
  );
};
