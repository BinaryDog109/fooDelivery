import "./App.css";

// Comp
import { Navbar } from "./components/Navbar";
import { Route, Switch } from "react-router-dom";
// Pages
import { FoodManagement } from "./page/FoodManagement/FoodManagement";

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
