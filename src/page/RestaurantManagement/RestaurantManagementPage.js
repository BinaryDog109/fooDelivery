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
import { Navbar } from "../../components/Navbar";
import { Route, Switch } from "react-router-dom";
import { RestaurantManagementBell } from "./RestaurantManagementBell";
import { RestaurantManagement } from "./RestaurantManagement";
import { useState } from "react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import {RestaurantListDetail} from "./RestaurantListDetail";
import { useGetDocuments } from "../../hooks/useGetDocuments";
// import { RestaurantListCard } from "./RestaurantListCard";

export const RestaurantManagementPage = ({basePath}) => {
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
    console.log(restaurants);
    const [tabIndex, setTabIndex] = useState(0);
    const [activeOrder, setActiveOrder] = useState(null);

    return (
        <>
            <Navbar>
                <Switch>
                    <Route path={basePath}>
                        <RestaurantManagementBell
                            setActiveOrder={setActiveOrder}
                            setTabIndex={setTabIndex}
                        />
                    </Route>
                </Switch>
            </Navbar>
            <Switch>
                <Route path={basePath}>
                    <RestaurantManagement
                        setActiveOrder={setActiveOrder}
                        activeOrder={activeOrder}
                        tabIndex={tabIndex}
                        setTabIndex={setTabIndex}
                    />
                </Route>
            </Switch>
            <Container p={2} style={styles} mt={5} borderRadius="md" boxShadow={"xl"}>
                {error && <div>{error}</div>}
                <Switch>
                    <Route exact path={"/restaurantmanage"}>
                        <ScaleFade in={true}>
                            <List>
                                {restaurants &&
                                restaurants.map((restaurant) => (
                                        <ListItem borderRadius={"md"} _hover={{bg: "gray.200"}}
                                                  className="restaurant-item"
                                                  listStyleType={"none"}
                                        >
                                            <RestaurantListDetail data={restaurant} />
                                        </ListItem>
                                ))}
                            </List>
                        </ScaleFade>
                    </Route>
                    <Route path={basePath + "/restaurants/:id"}>
                        {/*<RestaurantListCard></RestaurantListCard>*/}
                    </Route>
                </Switch>
            </Container>
        </>
    );
}
