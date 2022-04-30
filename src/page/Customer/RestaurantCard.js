import { Box, Button, Heading, IconButton, ScaleFade, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useGetDocuments } from "../../hooks/useGetDocuments";
import { useUserContext } from "../../hooks/useUserContext";

import { ItemGrid } from "../../components/ItemGrid";
import { RestaurantFoodCard } from "./RestaurantFoodCard";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ArrowLeftIcon } from "@chakra-ui/icons";

export const RestaurantCard = () => {
  const param = useParams();
  const { id } = useUserContext();
  const { docs, error } = useGetDocuments("Restaurants", id, "Food");
  const history = useHistory();

  return (
    <>
      {error && <div>{error}</div>}
      <ScaleFade in={true}>
        <Box p={2} bg={"white"}>
          <Box textAlign={"left"}>
          <Button
           textAlign={"left"}
            px={2}
            py={1}
            bg="white"
            fontSize="sm"
            
            fontWeight="bold"
            rounded="lg"
            textTransform="uppercase"
            _hover={{
              bg: "gray.200",
            }}
            _focus={{
              bg: "gray.400",
            }}
            onClick={()=>history.goBack()}
          >
            <Text bgGradient="linear(to-r, band1.100, band2.600)"
            bgClip="text">{"< "}return</Text>
            
          </Button></Box>
          <Heading
            fontSize={["2xl", "4xl"]}
            mb={2}
            bgGradient="linear(to-r, band1.100, band2.600)"
            bgClip="text"
          >
            Mcdonals
          </Heading>
          {docs && (
            <ItemGrid
              columns={{ sm: 1, md: 2 }}
              data={docs}
              Card={RestaurantFoodCard}
            />
          )}
        </Box>
      </ScaleFade>
    </>
  );
};
