import { Box, Heading, ScaleFade } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import {RestaurantFoodCard} from "./RestaurantFoodCard"

export const RestaurantCard = () => {
  const param = useParams();
  console.log(param);
  return (
    <>
      <ScaleFade in={true}>
        <Box p={2} height={"lg"} bg={"white"}>
          <Heading size={"4xl"} mb={2} bgGradient='linear(to-r, band1.100, band2.600)'
  bgClip='text'>
              Mcdonals
              </Heading>
          <RestaurantFoodCard />
          
        </Box>
      </ScaleFade>
    </>
  );
};
