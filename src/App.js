import logo from "./logo.svg";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Route, Switch } from "react-router-dom";
import { FoodManagement } from "./page/FoodManagement";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route>
          <FoodManagement />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
