import {
    Button,
    Tabs,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    useDisclosure, Container, ScaleFade, List, ListItem,
} from "@chakra-ui/react";
import { ItemGrid } from "../../components/ItemGrid";
import { RestaurantItemModal } from "./RestaurantItemModal";
import { useMemo } from "react";
import { AddIcon } from "@chakra-ui/icons";
import { useGetDocuments } from "../../hooks/useGetDocuments";
import { useUserContext } from "../../hooks/useUserContext";
import { Card } from "../../components/Card";
import { ListAccordion } from "../../components/ListAccordion";
import {RestaurantListDetail} from "./RestaurantListDetail";
import {Route, Switch} from "react-router-dom";
const basePath = "/restaurantmanage";

export const RestaurantManagement = ({
                                   tabIndex,
                                   setTabIndex,
                                   activeOrder,
                                   setActiveOrder,
                               }) => {

    const { docs: restaurants } = useGetDocuments("Restaurants");
    console.log(restaurants);
    const { id, orders, orderError } = useUserContext();
    const { docs, error } = useGetDocuments("Restaurants", id, "Food");

    const styles = useMemo(
        () => ({
            width: "85%",
            maxWidth: "960px",
            margin: "0 auto",
        }),
        []
    );

    const listStyles = useMemo(
        () => ({
            width: "100%",
            maxWidth: "960px",
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "white",
        }),
        []
    );
    const { isOpen, onOpen, onClose } = useDisclosure();

    const tabListTextColor = "gray.500";
    const yOffset = 5;

    // Optimise with useMemo
    return useMemo(() => {
        return (
            <div className="food-container" style={styles}>
                {error && <p>{error}</p>}
                {orderError && <p>{orderError}</p>}

                {/*<RestaurantItemModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />*/}
                <Tabs
                    index={tabIndex}
                    onChange={setTabIndex}
                    variant="soft-rounded"
                    colorScheme="yellow"
                >
                    <TabList
                        zIndex={2}
                        boxShadow={"dark-lg"}
                        borderRadius={"sm"}
                        p={2}
                        bg={"white"}
                        pos={"sticky"}
                        top={0}
                        mt={yOffset}
                        alignItems="center"
                    >
                        <Tab color={tabListTextColor}>wait for approval</Tab>
                        <Tab color={tabListTextColor}>approved</Tab>
                        <Tab color={tabListTextColor}>declined</Tab>
                        {/*{tabIndex === 0 ? (*/}
                        {/*    <Button*/}
                        {/*        ml={"auto"}*/}
                        {/*        leftIcon={<AddIcon />}*/}
                        {/*        colorScheme="yellow"*/}
                        {/*        variant="solid"*/}
                        {/*        onClick={onOpen}*/}
                        {/*    >*/}
                        {/*        Add*/}
                        {/*    </Button>*/}
                        {/*) : null}*/}
                    </TabList>
                    <Container p={2} style={listStyles} mt={5} borderRadius="md" boxShadow={"xl"}>
                        {error && <div>{error}</div>}
                        <Switch>
                            <Route exact path={"/restaurantmanage"}>
                                <ScaleFade in={true}>
                                    <TabPanels pt={5} mb={yOffset}>
                                        <TabPanel p={0}>
                                            <List>
                                                {restaurants &&
                                                restaurants.map((restaurant) => {
                                                    if (restaurant.status === "waiting")
                                                    return(
                                                        <ListItem borderRadius={"md"} _hover={{bg: "gray.200"}}
                                                                  className="restaurant-item"
                                                                  listStyleType={"none"}
                                                        >
                                                            <RestaurantListDetail data={restaurant} status={0}/>
                                                        </ListItem>
                                                    )
                                                })}
                                            </List>
                                        </TabPanel>
                                        <TabPanel p={0}>
                                            <List>
                                                {restaurants &&
                                                restaurants.map((restaurant) => {
                                                    if (restaurant.status === "accepted")
                                                        return(
                                                            <ListItem borderRadius={"md"} _hover={{bg: "gray.200"}}
                                                                      className="restaurant-item"
                                                                      listStyleType={"none"}
                                                            >
                                                                <RestaurantListDetail data={restaurant} status={1}/>
                                                            </ListItem>
                                                        )
                                                })}
                                            </List>
                                        </TabPanel>
                                        <TabPanel p={0}>
                                            <List>
                                                {restaurants &&
                                                restaurants.map((restaurant) => {
                                                    if (restaurant.status === "declined")
                                                        return(
                                                            <ListItem borderRadius={"md"} _hover={{bg: "gray.200"}}
                                                                      className="restaurant-item"
                                                                      listStyleType={"none"}
                                                            >
                                                                <RestaurantListDetail data={restaurant} status={2}/>
                                                            </ListItem>
                                                        )
                                                })}
                                            </List>
                                        </TabPanel>
                                    </TabPanels>
                                </ScaleFade>
                            </Route>
                            <Route path={basePath + "/restaurants/:id"}>
                                {/*<RestaurantListCard></RestaurantListCard>*/}
                            </Route>
                        </Switch>
                    </Container>
                </Tabs>
            </div>
        );
    }, [
        docs,
        error,
        onOpen,
        onClose,
        isOpen,
        styles,
        orders,
        orderError,
        tabIndex,
        setTabIndex,
        activeOrder,
        setActiveOrder,
    ]);
};
