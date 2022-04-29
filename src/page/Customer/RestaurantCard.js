import { Box, Heading, ScaleFade } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import {useGetDocuments} from "../../hooks/useGetDocuments"
import {useUserContext} from "../../hooks/useUserContext"

import { ItemGrid } from "../../components/ItemGrid";
import {RestaurantFoodCard} from "./RestaurantFoodCard"

export const RestaurantCard = () => {
  const param = useParams();
  const {id} = useUserContext()
  console.log(param);
  const { docs, error } = useGetDocuments("Restaurants", id, "Food");

  return (
    <>
    {error && <div>{error}</div>}
      <ScaleFade in={true}>
        <Box p={2} bg={"white"}>
          <Heading fontSize={["2xl", "4xl"]} mb={2} bgGradient='linear(to-r, band1.100, band2.600)'
  bgClip='text'>
              Mcdonals
              </Heading>
            {docs && <ItemGrid columns={{sm: 1, md: 2}} data={docs} Card={RestaurantFoodCard} />}
        </Box>
      </ScaleFade>
    </>
  );
};
