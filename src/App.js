import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import "./App.css";
import { CustomerPage } from "./page/Customer/CustomerPage";
import { DeliveryPersonPage } from "./page/DeliveryPerson/DeliveryPersonPage";
import { FoodManagementPage } from "./page/FoodManagement/FoodManagementPage";
import { SignupPage } from "./page/Signup/SignupPage";

function App() {
  const foodManagementBasePath = "/foodmanage";
  const customerBasePath = "/cus";
  const deliveryBasePath = "/de";
  const signupBasePath = "/reg";
  console.log("app renders!");
  return (
    <div className="App">
      <Switch>
        <Route path={customerBasePath}>
          <CustomerPage basePath={customerBasePath} />
        </Route>
        <Route path={foodManagementBasePath}>
          <FoodManagementPage basePath={foodManagementBasePath} />
        </Route>
        <Route path={deliveryBasePath}>
          <DeliveryPersonPage basePath={deliveryBasePath} />
        </Route>
        <Route path={signupBasePath}>
          <SignupPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
