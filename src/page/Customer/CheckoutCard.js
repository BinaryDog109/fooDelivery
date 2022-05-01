import {
  Box,
  Button,
  Divider,
  Heading,
  ScaleFade,
  TableCaption,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { OperationAlertDialog } from "../../components/OperationAlertDialog";
import { ReturnButton } from "../../components/ReturnButton";
import { useCart } from "../../hooks/useCart";
import { useCRUD } from "../../hooks/useCRUD";

export const CheckoutCard = ({basePath}) => {
  // Userd by the Paid Now dialog
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const history = useHistory();
  const { userId, cart, error: cartError, updateUser, isPending: cartPendng } = useCart();
  const { batchAdd, response } = useCRUD("Orders");
  const toast = useToast();
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
  //   Group cart into orders for different restaurants
  const ordersObj =
    cart &&
    cart.reduce(function (acc, elem) {
      acc[elem.restaurantId] = acc[elem.restaurantId] || [];
      acc[elem.restaurantId].push(elem);
      return acc;
    }, Object.create(null));
  const orderNum = ordersObj && Object.keys(ordersObj).length;
  //   Creating new orders
  const newOrders =
    ordersObj &&
    Object.keys(ordersObj).map((restaurantId) => {
      const newOrder = {
        status: "Paid",
        postCode: "SO16 3UF",
        restaurantId,
        uid: userId,
        food: ordersObj[restaurantId].map((item) => ({
          name: item.name,
          price: item.price,
          number: item.number,
        })),
      };
      return newOrder;
    });
  const handlePay = () => {
    if (newOrders) {
      batchAdd(newOrders);
      onClose()
      updateUser(userId, {cart: []})
      history.push(basePath + "/orders")
    } else {
      console.log("There are no items!");
    }
  };
  //   Handle batch success and error
  useEffect(() => {
    if (response.success) {
      toast({
        title: "Orders added, congrats!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [response.success, toast]);
  useEffect(() => {
    if (response.error) {
      toast({
        title: "Fail to order",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [response.error, toast]);

  return (
    ordersObj && (
      <>
        <ScaleFade in={true}>
          {cartError && <Heading>{cartError}</Heading>}
          <OperationAlertDialog
            isOpen={isOpen}
            cancelRef={cancelRef}
            onClose={onClose}
            title="Ready to pay?"
            text="You are about to order your meal."
          >
            {/* cancelRef to put an outline on the button */}
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                handlePay()
              }}
              ml={3}
            >
              Confirm Payment
            </Button>
          </OperationAlertDialog>

          <Box textAlign={"left"}>
            <ReturnButton history={history} />
          </Box>
          <Heading
            fontSize={["2xl", "4xl"]}
            mb={2}
            bgGradient="linear(to-r, band1.100, band2.600)"
            bgClip="text"
          >
            Please confirm your {orderNum} order{orderNum > 1 ? "s" : ""}:
          </Heading>
          <Divider />
          {Object.keys(ordersObj).map((restaurantId) => (
            <React.Fragment key={restaurantId}>
              <TableContainer mb={4}>
                <Table size="sm">
                  <TableCaption mt={1} mb={2}>
                    <Heading textAlign={"left"} as={"h3"} size={"md"}>
                      ...From {ordersObj[restaurantId][0].restaurantInfo.name}
                    </Heading>
                    <Text maxW={"sm"} whiteSpace="normal" textAlign={"left"}>
                      {ordersObj[restaurantId][0].restaurantInfo.address}
                    </Text>
                  </TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Amount</Th>
                      <Th>Name</Th>
                      <Th isNumeric>Price</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {ordersObj[restaurantId].map((item, index) => (
                      <Tr key={index}>
                        <Td>{item.number}</Td>
                        <Td>{item.name}</Td>
                        <Td isNumeric>{item.price}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                  <Tfoot></Tfoot>
                </Table>
              </TableContainer>
              <Divider></Divider>
            </React.Fragment>
          ))}
          <Box textAlign={"right"} className="checkout-info">
            <Heading mt={2} size={"sm"} as={"h4"}>
              Total Price
            </Heading>
            <Text>£{totalPrice}</Text>
            <Text fontSize={"sm"}>Deliver to: your address</Text>
            <Button
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
              onClick={onOpen}
              disabled={orderNum<=0 || response.isPending} 
            >
              Pay Now
            </Button>
          </Box>
        </ScaleFade>
      </>
    )
  );
};
