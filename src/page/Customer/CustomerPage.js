import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Image,
  List,
  ListItem,
  MenuItem,
  ScaleFade,
  Text,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { HiOutlineLocationMarker, HiOutlineClock } from "react-icons/hi";
import { useMemo } from "react";
import { Navbar } from "../../components/Navbar";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { RestaurantCard } from "./RestaurantCard";
import { CartPopup } from "./CartPopup";
import { useUserContext } from "../../hooks/useUserContext";
import { RestaurantListItem } from "./RestaurantListItem";
import { useGetDocuments } from "../../hooks/useGetDocuments";
import {CheckoutCart} from "./CheckoutCart"

export const CustomerPage = ({ basePath = "/" }) => {
  const styles = useMemo(
    () => ({
      width: "85%",
      maxWidth: "960px",
      marginLeft: "auto",
      marginRight: "auto",
      backgroundColor: "white",
    }),
    []
  );
  const { docs: restaurants, error } = useGetDocuments("Restaurants");
  return (
    <>
      {useMemo(
        () => (
          <Navbar>
            <CartPopup basePath={basePath} />
          </Navbar>
        ),
        [basePath]
      )}
      <Container p={2} style={styles} mt={5} borderRadius="md" boxShadow={"xl"}>
        {error && <div>{error}</div>}
        <Switch>
          <Route exact path={"/cus"}>
            <ScaleFade in={true}>
              <List>
                {restaurants &&
                  restaurants.map((restaurant) => (
                    <Link key={restaurant.id} to={basePath + `/restaurants/${restaurant.id}`}>
                      <ListItem borderRadius={"md"} _hover={{bg: "gray.200"}}
                        className="restaurant-item"
                        listStyleType={"none"}
                      >
                        <RestaurantListItem data={restaurant} />
                      </ListItem>
                    </Link>
                  ))}
              </List>
            </ScaleFade>
          </Route>
          <Route path={basePath + "/restaurants/:id"}>
            <RestaurantCard></RestaurantCard>
          </Route>
          <Route path={basePath + "/checkout"}>
            <CheckoutCart basePath={basePath} />
          </Route>
        </Switch>
      </Container>
    </>
  );
};
