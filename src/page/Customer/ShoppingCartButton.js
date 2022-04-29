import { AiOutlineShoppingCart } from "react-icons/ai";
import { chakra, Flex, IconButton, useColorModeValue } from "@chakra-ui/react";
import { useUserContext } from "../../hooks/useUserContext";

export const ShoppingCartButton = () => {
    const context = useUserContext()
    console.log(context)
    const cart = context.cart
  return (
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
  )
}