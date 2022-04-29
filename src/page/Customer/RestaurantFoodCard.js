import React from "react";
import { chakra, Box, Flex, useColorModeValue, HStack, Text } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

export const RestaurantFoodCard = () => {
  return (
    <Flex
      maxW="sm"
      bg={useColorModeValue("white", "gray.800")}
      shadow="md"
      rounded="lg"
      overflow="hidden"
      textAlign={"left"}
    >
      <Box
        w={1 / 3}
        bgSize="cover"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1523218345414-cd47aea19ba6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        }}
      ></Box>

      <Box w={2 / 3} p={{ base: 2, md: 4 }}>
        <chakra.h1
          noOfLines={1}
          fontSize={["lg", "2xl"]}
          fontWeight="bold"
          color={useColorModeValue("gray.800", "white")}
        >
            <Text>Meal Deal</Text>
          
        </chakra.h1>

        <chakra.p
          mt={2}
          fontSize="sm"
          color={useColorModeValue("gray.600", "gray.400")}
          noOfLines={2}
        >
          Lorem ipsum dolor sit amet consectetur adipisicingaaaaaaaaa elit In
          odit
        </chakra.p>

        <HStack spacing={1} display="flex" alignItems="center" mt={2}>
          <Text>Price: $123</Text>
        </HStack>

        <Flex mt={3} alignItems="center" justifyContent="space-between">
          <chakra.h1 color="white" fontWeight="bold" fontSize="lg">
            $220
          </chakra.h1>
          <chakra.button
            px={2}
            py={1}
            bgGradient='linear(to-r, band1.100, band2.600)'
            fontSize="xs"
            color="white"
            fontWeight="bold"
            rounded="lg"
            textTransform="uppercase"
            _hover={{
                bg: "purple.700"
              
            }}
            _focus={{
              bg: "cyan.800",
            }}
          >
            Add to cart
          </chakra.button>
        </Flex>
      </Box>
    </Flex>
  );
};
