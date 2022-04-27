import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import theme from "./themes";
// UI
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
