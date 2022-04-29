import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import "./App.css";
import { CustomerPage } from "./page/Customer/CustomerPage";
import { FoodManagementPage } from "./page/FoodManagement/FoodManagementPage";

function App() {
  const foodManagementBasePath = "/foodmanage";
  const customerBasePath = "/cus";
  return (
    <div className="App">
      <Switch>
        <Route path={customerBasePath}>
          <CustomerPage basePath={customerBasePath} />
        </Route>
        <Route path={foodManagementBasePath}>
          <FoodManagementPage basePath={foodManagementBasePath} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
