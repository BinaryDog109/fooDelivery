import {
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ScaleFade,
  Tab,
  TabList,
  Tabs,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { Navbar } from "../../components/Navbar";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { RestaurantCard } from "./RestaurantCard";
import { CartPopup } from "./CartPopup";
import { RestaurantListItem } from "./RestaurantListItem";
import { useGetDocuments } from "../../hooks/useGetDocuments";
import { CheckoutCard } from "./CheckoutCard";
import { ViewOrderCard } from "./ViewOrderCard";
import { NotificationPopup } from "./NotificationPopup";

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
  const images = [
    "https://bit.ly/2jYM25F",
    "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    "https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    "https://images.unsplash.com/photo-1587899897387-091ebd01a6b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1513&q=80",
    "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    "https://images.unsplash.com/photo-1620131810504-79cc8cb61a70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1528735000313-039ec3a473b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
  ]
  return (
    <>
      {useMemo(
        () => (
          <Navbar>
            <CartPopup basePath={basePath} />
            <NotificationPopup basePath={basePath} />
          </Navbar>
        ),
        [basePath]
      )}
      <Container p={2} style={styles} mt={5} borderRadius="md" boxShadow={"xl"}>
        {error && <div>{error}</div>}
        <Tabs variant={"unstyled"}>
          <TabList>
            <Box borderRadius={"md"} _hover={{ bg: "gray.200" }}>
              <Link to={basePath}>
                <Tab>Restaurants</Tab>
              </Link>
            </Box>
            <Box borderRadius={"md"} _hover={{ bg: "gray.200" }}>
              <Link to={basePath + "/orders"}>
                <Tab>My Orders</Tab>
              </Link>
            </Box>
          </TabList>
          <Divider></Divider>

          <Switch>
            <Route exact path={basePath}>
              <ScaleFade in={true}>
                <List>
                  {restaurants &&
                    restaurants.map((restaurant) => (
                      <Link
                        key={restaurant.id}
                        to={basePath + `/restaurants/${restaurant.id}`}
                      >
                        <ListItem
                          borderRadius={"md"}
                          _hover={{ bg: "gray.200" }}
                          className="restaurant-item"
                          listStyleType={"none"}
                        >
                          <RestaurantListItem images={images} data={restaurant} />
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
              <CheckoutCard basePath={basePath} />
            </Route>
            <Route path={basePath + "/orders"}>
              <ViewOrderCard basePath={basePath} />
            </Route>
          </Switch>
        </Tabs>
      </Container>
    </>
  );
};
