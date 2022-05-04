import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import "./App.css";
import { RestaurantOrderContextProvider } from "./context/RestaurantOrderContext";
import { CustomerPage } from "./page/Customer/CustomerPage";
import { DeliveryPersonPage } from "./page/DeliveryPerson/DeliveryPersonPage";
import { FoodManagementPage } from "./page/FoodManagement/FoodManagementPage";
import { SignupPage } from "./page/Signup/SignupPage";
import { LoginPage } from "./page/Login/LoginPage";
import { useAuthContext } from "./hooks/useAuthContext";
import { useUserContext } from "./hooks/useUserContext";
import { Redirect } from "react-router-dom";

function App() {
  const { authIsReady } = useAuthContext();
  const { roles } = useUserContext();
  const foodManagementBasePath = "/foodmanage";
  const customerBasePath = "/cus";
  const deliveryBasePath = "/de";
  const signupBasePath = "/reg";
  const loginBasePath = "/login";
  console.log("app renders!");
  return (
    authIsReady && (
      <div className="App">
        <Switch>
          <Route path={customerBasePath}>
            {roles === "customer" ? (
              <CustomerPage basePath={customerBasePath} />
            ) : (
              <Redirect to={loginBasePath} />
            )}
          </Route>
          <Route path={foodManagementBasePath}>
            {roles === "restaurant manager" ? (
              <RestaurantOrderContextProvider>
                <FoodManagementPage basePath={foodManagementBasePath} />
              </RestaurantOrderContextProvider>
            ) : (
              <Redirect to={loginBasePath} />
            )}
          </Route>
          <Route path={deliveryBasePath}>
            {roles === "delivery" ? (
              <DeliveryPersonPage basePath={deliveryBasePath} />
            ) : (
              <Redirect to={loginBasePath} />
            )}
          </Route>
          <Route path={signupBasePath}>
            {roles === "customer" && <Redirect to={customerBasePath} />}
            {roles === "restaurant manager" && (
              <Redirect to={foodManagementBasePath} />
            )}
            {roles === "delivery" && <Redirect to={deliveryBasePath} />}
            {roles === "guest" && <SignupPage />}
          </Route>
          <Route path={loginBasePath}>
            {roles === "customer" && <Redirect to={customerBasePath} />}
            {roles === "restaurant manager" && (
              <Redirect to={foodManagementBasePath} />
            )}
            {roles === "delivery" && <Redirect to={deliveryBasePath} />}
            {roles === "guest" && <LoginPage />}
          </Route>
        </Switch>
      </div>
    )
  );
}

export default App;
