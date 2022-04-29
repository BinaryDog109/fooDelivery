import { Navbar } from "../../components/Navbar"; 
import { Route, Switch } from "react-router-dom";
import { FoodManagementBell } from "./FoodManagementBell";
import { FoodManagement } from "./FoodManagement";
import { useState } from "react";

export const FoodManagementPage = ({basePath}) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [activeOrder, setActiveOrder] = useState(null);

  return (
    <>
      <Navbar>
        <Switch>
          <Route path={basePath}>
            <FoodManagementBell
              setActiveOrder={setActiveOrder}
              setTabIndex={setTabIndex}
            />
          </Route>
        </Switch>
      </Navbar>
      <Switch>
        <Route path={basePath}>
          <FoodManagement
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
