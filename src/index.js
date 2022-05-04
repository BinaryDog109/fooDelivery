import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import theme from "./themes";
// UI
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";
import { AuthContextProvider } from "./context/AuthContext";

ReactDOM.render(
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
