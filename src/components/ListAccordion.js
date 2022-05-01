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
} from "@chakra-ui/react";
export const ListAccordion = ({
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
  return (
    <Accordion
      width="100%"
      boxShadow={"lg"}
      borderRadius={10}
      bg={"white"}
      allowMultiple
      index={index===-1? 0 : index}
      onChange={(index) => {
        const selected = data[index];
        setActiveOrder(selected.id);
      }}
    >
      {data.map((elem) => {
        const date =
          elem.createdAt && elem.createdAt.toDate()
        const dateString = date && `${date.toLocaleDateString("en-gb")} - ${date.toLocaleTimeString("en-gb")}`;
        const post = elem.postCode;
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
          <Box key={elem.id} id={elem.id}>
            <AccordionItem borderRadius={10}>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Text>Deliver to: {post}</Text>
                    <Text fontSize={"sm"}>
                      Deliver person location: unknown
                    </Text>
                    <Text fontSize={"xs"}>{dateString}</Text>
                    <Text fontSize={"xl"}>Total: £{totalPrice}</Text>
                  </Box>
                  <Badge fontSize="lg" colorScheme={computeStatusColor(elem.status)}>
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
                {roles === "restaurant manager" ? (
                  <Button my={4} colorScheme="blue">
                    Accept & Allocate Delivery
                  </Button>
                ) : null}
              </AccordionPanel>
            </AccordionItem>
          </Box>
        );
      })}
    </Accordion>
  );
};
