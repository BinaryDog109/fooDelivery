import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Portal,
  chakra,
  IconButton,
  Text,
  Flex,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useUserContext } from "../../hooks/useUserContext";
import { ItemAddMinusButton } from "./ItemAddMinusButton";

export const CartPopup = ({basePath}) => {
  const toast = useToast();
  const { userId, cart, updateUser, isPending, success } = useCart();
  // Handles the operations' response: resets the form if success, displays a toast
  // You can use a simple if statement but toast() will throw an error (try update the state while rendering)
  useEffect(() => {
    if (success) {
      toast({
        title: "Cart updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [success, toast]);
  const totalPrice =
    cart &&
    cart
      .reduce((acc, prev) => {
        const num = +prev.number;
        const singePrice = +prev.price;
        const singleTotal = num * singePrice;
        return acc + singleTotal;
      }, 0)
      .toFixed(2);
  const handleCart = (sign, item) => {
    sign === "+"
      ? (item.number = +item.number + 1)
      : (item.number = +item.number - 1);
    if (item.number === 0) {
      // If there is 0 number of this food, delete it from the cart
      const index = cart.findIndex((food) => food.foodId === item.foodId);
      cart.splice(index, 1);
    }
    updateUser(userId, { cart });
  };
  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          isRound
          icon={
            <>
              <AiOutlineShoppingCart size={25} />
              <chakra.span
                pos="absolute"
                top="0px"
                left="-1px"
                px={2}
                py={1}
                fontSize="xs"
                fontWeight="bold"
                lineHeight="none"
                color="red.100"
                transform="translate(-50%, -50%)"
                bg="red.600"
                rounded="full"
              >
                {cart && cart.length}
              </chakra.span>
            </>
          }
        />
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader
            bgGradient="linear(to-r, band1.100, band2.600)"
            bgClip="text"
            fontWeight={"800"}
          >
            Your Cart
          </PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            {cart &&
              cart.map((item, index) => (
                <Flex key={index} justify={"space-between"}>
                  <Text>
                    {item.number}x {item.name} £{item.price} per
                  </Text>
                  <ItemAddMinusButton
                    item={item}
                    handleClick={handleCart}
                    isPending={isPending}
                  />
                </Flex>
              ))}
          </PopoverBody>
          <Link to={basePath + "/checkout"}>
            <Button w={"100%"} variant={"ghost"}>
              <PopoverFooter
                borderTop={0}
                bgGradient="linear(to-r, band1.100, band2.600)"
                bgClip="text"
              >
                Checkout £{totalPrice}
              </PopoverFooter>
            </Button>
          </Link>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
