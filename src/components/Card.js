import { Box, Heading, Text, Image, Badge, WrapItem } from "@chakra-ui/react";
import styles from "./Card.module.css";

export const Card = ({ title, desc }) => {
  return (
    <div className={styles["food-card"]}>
      <Box
        shadow={"md"}
        bg={"gray.50"}
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <Image
          src={
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80"
          }
          alt={"Drake"}
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
            {title}
          </Box>

          <Box>
            {"5膀5"}
            <Box as="span" color="gray.600" fontSize="sm">
              / mth
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};
