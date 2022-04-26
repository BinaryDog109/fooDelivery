import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
  Input,
  NumberInput,
  NumberInputField,
  Flex,
  Textarea,
  Text
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import styles from "./FoodItemModal.module.css";

export const FoodItemModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        ml={"auto"}
        leftIcon={<AddIcon />}
        colorScheme="yellow"
        variant="solid"
        onClick={onOpen}
      >
        Add
      </Button>
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
            
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" variant={"ghost"} mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="green">Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
