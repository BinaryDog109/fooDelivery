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
} from "@chakra-ui/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useUserContext } from "../../hooks/useUserContext";

export const CartPopup = ({cart}) => {
  
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
          <PopoverHeader>Your Cart</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            {cart &&
              cart.map((item, index) => (
                
                  <Flex key={index} justify={"space-between"} flexWrap="wrap">
                    <Text>
                      {item.number}x {item.name} £{item.price}
                    </Text>
                    <Box>
                      <IconButton
                        size={"xs"}
                        icon={<AddIcon />}
                        isRound
                      ></IconButton>
                      <IconButton
                        size={"xs"}
                        icon={<MinusIcon />}
                        isRound
                      ></IconButton>
                    </Box>
                  </Flex>
                
              ))}
          </PopoverBody>
          <PopoverFooter>Checkout</PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
