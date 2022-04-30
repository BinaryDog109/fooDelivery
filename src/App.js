import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import "./App.css";
import { CustomerPage } from "./page/Customer/CustomerPage";
import { FoodManagementPage } from "./page/FoodManagement/FoodManagementPage";
import { RestaurantManagementPage } from "./page/RestaurantManagement/RestaurantManagementPage";

function App() {
  const foodManagementBasePath = "/foodmanage";
  const customerBasePath = "/cus";
  const restaurantBasePath = "/restaurantmanage";
  console.log("app renders!")
  return (
    <div className="App">
      <Switch>
        <Route path={customerBasePath}>
          <CustomerPage basePath={customerBasePath} />
        </Route>
        <Route path={foodManagementBasePath}>
          <FoodManagementPage basePath={foodManagementBasePath} />
        </Route>
        <Route path={restaurantBasePath}>
          <RestaurantManagementPage basePath={restaurantBasePath} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
