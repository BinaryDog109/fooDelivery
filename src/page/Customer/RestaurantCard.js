import {
  Box,
  Button,
  Heading,
  IconButton,
  ScaleFade,
  Text,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useGetDocuments } from "../../hooks/useGetDocuments";

import { ItemGrid } from "../../components/ItemGrid";
import { RestaurantFoodCard } from "./RestaurantFoodCard";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ReturnButton } from "../../components/ReturnButton";
import { useRestaurant } from "../../hooks/useRetaurant";
import { useEffect } from "react";

export const RestaurantCard = () => {
  const { id: restaurantId } = useParams();
  const { docs: food, error } = useGetDocuments(
    "Restaurants",
    restaurantId,
    "Food"
  );
  const history = useHistory();
  const { restaurantInfo, unsubFunction } = useRestaurant(restaurantId);
  useEffect(() => {
    return () => {
      unsubFunction && unsubFunction();
    };
  }, [unsubFunction]);
  if (food) food.restaurantId = restaurantId;

  return !restaurantInfo ? null : (
    <>
      {error && <div>{error}</div>}
      <ScaleFade in={true}>
        <Box p={2}>
          <Box textAlign={"left"}>
            <ReturnButton history={history} />
          </Box>
          <Heading
            fontSize={["2xl", "4xl"]}
            mb={2}
            bgGradient="linear(to-r, band1.100, band2.600)"
            bgClip="text"
          >
            {restaurantInfo.name}
          </Heading>
          <Text my={2}>{restaurantInfo.description}</Text>
          {food && (
            <ItemGrid
              columns={{ sm: 1, md: 2 }}
              data={food}
              elemProps={{ restaurantId, restaurantInfo }}
              Card={RestaurantFoodCard}
            />
          )}
        </Box>
      </ScaleFade>
    </>
  );
};
