import {
  Box,
  Image,
  Badge,
  useDisclosure,
  Text,
  CloseButton,
  useToast,
  Button,
} from "@chakra-ui/react";
import styles from "./Card.module.css";
import { FoodItemModal } from "./FoodItemModal";
import { useCRUD } from "../../hooks/useCRUD";
import { useUserContext } from "../../hooks/useUserContext";
import { useEffect, useRef } from "react";
import { OperationAlertDialog } from "../../components/OperationAlertDialog";

export const FoodCard = ({ data }) => {
  // Toggle the Modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteDialogOpen,
    onOpen: onDeleteDialogOpen,
    onClose: onDeleteDialogClose,
  } = useDisclosure();
  const cancelRef = useRef();

  const { restaurantId: id } = useUserContext();
  const { deleteDoc, response } = useCRUD("Restaurants", id, "Food");
  const toast = useToast();
  const handleDelete = (foodId) => {
    deleteDoc(foodId);
  };
  useEffect(() => {
    if (response.success) {
      toast({
        title: "Food item deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onDeleteDialogClose();
    }
  }, [response.success, toast, onDeleteDialogClose]);
  const defaultImageUrl = "/img/food-unsplash.jpg";
  // Compare time difference between creation time and now
  const createdAt = data.createdAt;
  const createdDifference = (Date.now() / 1000) - (createdAt? createdAt.seconds : 0);
  const updatedAt = data.updatedAt;
  const updatedDifference = (Date.now() / 1000) - (updatedAt? updatedAt.seconds : 0);
  const createdLessThanFiveDays = createdDifference <= (5 * 86400)
  const updatedLessThanOneDays = updatedDifference <= (1 * 86400)

  return (
    <div className={styles["food-card"]}>
      <FoodItemModal
        data={data}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      />
      <OperationAlertDialog
        isOpen={isDeleteDialogOpen}
        cancelRef={cancelRef}
        onClose={onDeleteDialogClose}
      >
        {/* cancelRef to put an outline on the button */}
        <Button ref={cancelRef} onClick={onDeleteDialogClose}>
          Cancel
        </Button>
        <Button
          colorScheme="red"
          onClick={() => {
            handleDelete(data.id);
          }}
          ml={3}
        >
          Delete
        </Button>
      </OperationAlertDialog>

      <Box
        onClick={(e) => {
          // If clicking on the delete button
          if (e.target.closest("button")) return;
          else onOpen();
        }}
        shadow={"md"}
        bg={"gray.50"}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        height={500}
      >
        <Box pos={"relative"}>
          <CloseButton
            className="deleteButton"
            onClick={onDeleteDialogOpen}
            color={"gray"}
            size={"lg"}
            pos="absolute"
            right={0}
          />
          <Image
            height={200}
            width={"100%"}
            objectFit="cover"
            objectPosition={"center"}
            src={data.imagetoken || defaultImageUrl}
            alt={"A Food Photo"}
          />
        </Box>
        <Box p="6">
          <Box display="flex" alignItems="baseline">
            <Badge mr={2} borderRadius="full" px="2" colorScheme="teal">
              {createdLessThanFiveDays? "New": null}
            </Badge>
            <Badge mr={2} borderRadius="full" px="2" colorScheme="purple">
              {updatedLessThanOneDays? "Updated": null}
            </Badge>
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
            color={"black"}
          >
            {data.name}
          </Box>

          <Box>
            <Text color={"gray"} noOfLines={7}>
              {data.description}
            </Text>
          </Box>
          <Box as="span" color="black" fontSize="lg">
            £{data.price}
          </Box>
          {/* <p>{data.id}</p> */}
        </Box>
      </Box>
    </div>
  );
};
