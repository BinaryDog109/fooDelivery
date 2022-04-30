import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useCart } from "../../hooks/useCart";
import { useUserContext } from "../../hooks/useUserContext";
import { ItemAddMinusButton } from "./ItemAddMinusButton";

export const RestaurantFoodCard = ({ data }) => {
  const {
    userId,
    cart,
    error: cartError,
    updateUser,
    isPending: cartPendng,
  } = useCart();
  const foodInCartIndex =
    cart && cart.findIndex((item) => item.foodId === data.id);
  const foodInCart = cart && cart[foodInCartIndex];
  const handleCart = (sign, item) => {
    if (foodInCartIndex > -1) {
      // If the food already exists in the cart, update the num in the cart
      item = cart[foodInCartIndex];
      sign === "+"
        ? (item.number = +item.number + 1)
        : (item.number = +item.number - 1);
      if (item.number === 0) {
        // If there is 0 item of this food, delete it from the cart
        cart.splice(foodInCartIndex, 1);
      }
    } else {
      const foodTobeAddedToCart = {
        foodId: item.id,
        name: item.name,
        price: item.price,
        number: 1,
      };
      cart.push(foodTobeAddedToCart);
    }

    updateUser(userId, { cart });
  };

  return (
    <Flex
      bg={useColorModeValue("white", "gray.800")}
      shadow="md"
      rounded="lg"
      overflow="hidden"
      textAlign={"left"}
    >
      {cartError && <Text>{cartError}</Text>}
      <Box
        w={1 / 3}
        bgSize="cover"
        style={{
          backgroundImage: `url(${data.imagetoken})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
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

        <Flex
          flexWrap={"wrap"}
          mt={3}
          alignItems="center"
          justifyContent="space-between"
        >
          <chakra.h1 color="gray.600" fontWeight="bold" fontSize="lg">
            £{data.price}
          </chakra.h1>
          {foodInCart && foodInCart.number > 0 ? (
            <ItemAddMinusButton
              midNumberDisplay
              midNumber={foodInCart.number}
              item={data}
              handleClick={handleCart}
            />
          ) : (!cart? null : (
            <chakra.button
              px={2}
              py={1}
              bgGradient="linear(to-r, band1.100, band2.600)"
              fontSize="xs"
              color="white"
              fontWeight="bold"
              rounded="lg"
              textTransform="uppercase"
              _hover={{
                bgGradient: "linear(to-r, band1.50, band2.600)",
              }}
              _focus={{
                bgGradient: "linear(to-r, band1.200, band2.700)",
              }}
              onClick={() => handleCart("+", data)}
            >
              Add to cart
            </chakra.button>
          ))}
        </Flex> 
      </Box>
    </Flex>
  );
};
