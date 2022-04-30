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
import { useCRUD } from "../../hooks/useCRUD";
import { useEffect } from "react";
import { useUserContext } from "../../hooks/useUserContext";
import { useCart } from "../../hooks/useCart";
import { useRestaurant } from "../../hooks/useRetaurant";

export const RestaurantCard = () => {
  const {id: restaurantId} = useParams();
  const { docs: food, error } = useGetDocuments("Restaurants", restaurantId, "Food");
  const history = useHistory();
  const {restaurantInfo} = useRestaurant(restaurantId)

  return (
    <>
      {error && <div>{error}</div>}
      <ScaleFade in={true}>
        <Box p={2} bg={"white"}>
          <Box textAlign={"left"}>
            <ReturnButton history={history} />
          </Box>
          <Heading
            fontSize={["2xl", "4xl"]}
            mb={2}
            bgGradient="linear(to-r, band1.100, band2.600)"
            bgClip="text"
          >
            {restaurantInfo && restaurantInfo.name}
          </Heading>
          {food && (
            <ItemGrid
              columns={{ sm: 1, md: 2 }}
              data={food}
              Card={RestaurantFoodCard}
            />
          )}
        </Box>
      </ScaleFade>
    </>
  );
};
