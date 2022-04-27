import { Box, Image, Badge, useDisclosure } from "@chakra-ui/react";
import styles from "./Card.module.css";
import { FoodItemModal } from "../page/FoodManagement/FoodItemModal";

export const Card = ({ title, desc }) => {
  // Toggle the Modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className={styles["food-card"]}>
      <FoodItemModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />

      <Box
        onClick={onOpen}
        shadow={"md"}
        bg={"gray.50"}
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        height={500}
      >
        <Image
          height={200}
          width={"100%"}
          objectFit="cover"
          objectPosition={"center"}
          src={
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80"
          }
          alt={"A Food Photo"}
        />
        <Box p="6">
          <Box display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="teal">
              New
            </Badge>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              {5} beds &bull; {5} baths
            </Box>
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            lorem
          </Box>

          <Box>
            {"5.5"}
            <Box as="span" color="gray.600" fontSize="sm">
              / mth
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};
