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
  Box,
} from "@chakra-ui/react";
import { useCRUD } from "../../hooks/useCRUD";
import { useUserContext } from "../../hooks/useUserContext";
import { useEffect } from "react";
import styles from "./FoodItemForm.module.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

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
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const storage = getStorage();
    if(!file || file.type.indexOf("image") === -1) {
      console.log("Please upload an image!")
      return
    }
    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: "image/jpeg",
    };
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("idle");
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            console.log("User doesn't have permission to access the object");
            break;
          case "storage/canceled":
            console.log("User canceled the upload");
            break;
          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
          default:
            console.log("error: ", error);
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
  };
  return (
    <>
      <form
        onSubmit={(event) => handleSubmit(event, foodId)}
        id="food-item-form"
      >
        <Box>
          <label htmlFor="file-input">
            <Image
              className={styles.image}
              src="https://images.unsplash.com/photo-1612927601601-6638404737ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            />
          </label>
          <input
            style={{ display: "none" }}
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </Box>
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
