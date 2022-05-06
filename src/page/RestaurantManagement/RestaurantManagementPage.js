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

        </>
    );
}
