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
export const ListAccordion = ({data}) => {
  return (
    <Accordion
      width="100%"
      boxShadow={"lg"}
      borderRadius={10}
      bg={"white"}
      defaultIndex={[0]}
      allowMultiple
    >
      {data.map((elem) => { 
          const date = elem.createdAt && elem.createdAt.toDate().toLocaleDateString("en-gb")
          const post = elem.postCode
          const totalPrice = elem.food && elem.food.reduce((acc, prev) => {
            const num = + prev.number
            const singePrice = + prev.price
            const singleTotal = num * singePrice
            return acc + singleTotal
          }, 0).toFixed(2)
          return (
        <AccordionItem key={elem.id} borderRadius={10}>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text>Deliver to: {post}</Text>
                <Text fontSize={"xs"}>
                  {date}
                </Text>
                <Text fontSize={"xl"}>Total: £{totalPrice}</Text>
              </Box>
              <Badge fontSize="lg" colorScheme={"band2"}>
                {elem.status}
              </Badge>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Text>Here are your food items:</Text>
            {
                elem.food && elem.food.map(item => (
                    <Text fontSize={"xs"}>{item.number}x {item.name} £{item.price}</Text>
                ))
            }
            <Button my={4} colorScheme="blue">Accept & Allocate Delivery</Button>
          </AccordionPanel>
        </AccordionItem>
      )})}
    </Accordion>
  );
};
