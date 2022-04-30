import { Box, Center, Divider, Image, Text } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { HiOutlineLocationMarker, HiOutlineClock } from "react-icons/hi";

export const RestaurantListItem = ({data}) => {
  return (
    <>
      <Box p={4} display={{ md: "flex" }}>
        <Box flexShrink={0}>
          <Image
            borderRadius="lg"
            width={{ md: 40 }}
            src={"https://bit.ly/2jYM25F"}
            alt="Woman paying for a purchase"
          />
        </Box>
        <Box textAlign={"left"} mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
          <Text
            fontWeight="bold"
            textTransform="uppercase"
            fontSize="sm"
            letterSpacing="wide"
            color="teal.600"
          >
            Marketing
          </Text>
          <Text
            mt={1}
            display="block"
            fontSize="lg"
            lineHeight="normal"
            fontWeight="semibold"
            href="#"
          >
            {data.name || "Unknown name"}
          </Text>
          <Text noOfLines={3} mt={2} color="gray.500">
            {data.description}
          </Text>
        </Box>
        <Box
          flexShrink={0}
          ml="auto"
          textAlign="left"
          display={"flex"}
          flexDir="column"
          justifyContent={"center"}
          className="misc info"
        >
          <Text>
            <Icon mr={1} as={HiOutlineLocationMarker}></Icon>
            <span>SO16 3UF</span>
          </Text>
          <Text>
            <Icon mr={1} as={HiOutlineClock} />
            <span>12:00~2:00</span>
          </Text>
        </Box>
      </Box>
      <Center>
        <Divider w={"80%"} orientation="horizontal" />
      </Center>
    </>
  );
};
