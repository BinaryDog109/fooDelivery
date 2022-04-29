import { chakra, Box, Flex, useColorModeValue, HStack, Text } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

export const RestaurantFoodCard = ({data}) => {
  console.log(data)
  return (
    <Flex
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
            `url(${data.imagetoken})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
        }}
      ></Box>

      <Box w={2 / 3} p={{ base: 2, md: 4 }}>
        <chakra.h1
          noOfLines={1}
          fontSize={["lg", "2xl"]}
          fontWeight="bold"
          color={useColorModeValue("gray.800", "white")}
        >
            <Text>{data.name}</Text>
          
        </chakra.h1>

        <chakra.p
          mt={2}
          fontSize="sm"
          color={useColorModeValue("gray.600", "gray.400")}
          noOfLines={2}
        >
          {data.description}
        </chakra.p>

        <Flex flexWrap={"wrap"} mt={3} alignItems="center" justifyContent="space-between">
          <chakra.h1 color="gray.600" fontWeight="bold" fontSize="lg">
            {data.price}
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
