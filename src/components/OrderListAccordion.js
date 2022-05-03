import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Badge,
  Text,
  Button,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";
import {  useRef, useState } from "react";
import { MapModal } from "./MapModal";
import { AllocateDriverCard } from "../page/FoodManagement/AllocateDriverCard";
import { projectFirestore, timestamp } from "../firebase/config";
export const OrderListAccordion = ({
  data,
  activeOrder,
  setActiveOrder,
  roles = "restaurant manager",
}) => {
  const index = data.findIndex((elem) => {
    // console.log(elem.id === activeOrder)
    return elem.id === activeOrder;
  });
  const computeStatusColor = (status) => {
    const statusStr = status.toUpperCase();
    switch (statusStr) {
      case "PAID":
        return "band2";
      case "ACCEPTED":
        return "blue";
      case "DELIVERED":
        return "green";
      default:
        return "red";
    }
  };
  const cancelRef = useRef();
  const [selected, setSelected] = useState(null);
  const [allocating, setAllocating] = useState(false);
  const handleAllocate = async (orderId) => {
    console.log({ orderId });
    setAllocating(true);
    const updatedAt = timestamp.fromDate(new Date());
    //   Btach update in two collections
    const batch = projectFirestore.batch();
    const orderRef = projectFirestore.collection("Orders").doc(orderId);
    batch.update(orderRef, {
      status: "Accepted",
      deliverBy: selected,
      updatedAt,
    });
    const deliverRef = projectFirestore.collection("Users").doc(selected);
    batch.update(deliverRef, {
      hasOrder: orderId,
      updatedAt,
    });
    await batch.commit();
    console.log("update successful");
    setSelected(null)
    setAllocating(false);
  };

  return (
    <Accordion
      width="100%"
      boxShadow={"lg"}
      borderRadius={10}
      bg={"white"}
      allowMultiple
      index={index === -1 ? 0 : index}
      onChange={(index) => {
        const selected = data[index];
        setActiveOrder(selected.id);
      }}
    >
      {data.map((elem) => {
        const date = elem.createdAt && elem.createdAt.toDate();
        const dateString =
          date &&
          `${date.toLocaleDateString("en-gb")} - ${date.toLocaleTimeString(
            "en-gb"
          )}`;
        const post = elem.postCode;
        const orderId = elem.id;
        const totalPrice =
          elem.food &&
          elem.food
            .reduce((acc, prev) => {
              const num = +prev.number;
              const singePrice = +prev.price;
              const singleTotal = num * singePrice;
              return acc + singleTotal;
            }, 0)
            .toFixed(2);
        return (
          <Box key={elem.id}>
            <AccordionItem borderRadius={10}>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Text>OrderId: {elem.id}</Text>
                    <Text>Deliver to: {post}</Text>
                    <Text fontSize={"xs"}>{dateString}</Text>
                    <Text fontSize={"xl"}>Total: £{totalPrice}</Text>
                  </Box>
                  <Badge
                    fontSize="lg"
                    colorScheme={computeStatusColor(elem.status)}
                  >
                    {elem.status}
                  </Badge>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Text>Here are your food items:</Text>
                {elem.food &&
                  elem.food.map((item, index) => (
                    <Text key={index} fontSize={"xs"}>
                      {item.number}x {item.name} £{item.price}
                    </Text>
                  ))}
                <Divider></Divider>
                {roles === "restaurant manager" ? (
                  elem.status === "Paid" ? (
                    <>
                      Please select a driver:
                      <AllocateDriverCard
                        selected={selected}
                        setSelected={setSelected}
                      />
                      {selected && (
                        <Button
                          disabled={allocating}
                          mt={2}
                          onClick={() => {
                            handleAllocate(orderId);
                          }}
                          my={4}
                          colorScheme="blue"
                        >
                          Accept & Allocate Delivery
                        </Button>
                      )}
                    </>
                  ) : null
                ) : null}
                {/* Maps Dialog */}
                <MapModal order={elem} />
              </AccordionPanel>
            </AccordionItem>
          </Box>
        );
      })}
    </Accordion>
  );
};
