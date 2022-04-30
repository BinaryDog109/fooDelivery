import { Navbar } from "../../components/Navbar";
import { Route, Switch } from "react-router-dom";
import { RestaurantManagementBell } from "./RestaurantManagementBell";
import { RestaurantManagement } from "./RestaurantManagement";
import { useState } from "react";

export const RestaurantManagementPage = ({basePath}) => {
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
