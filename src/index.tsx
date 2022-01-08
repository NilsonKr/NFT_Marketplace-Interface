import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import CustomTheme from "./Theme";
import "./index.css";
import { App } from "./App";
import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "./Config/Web3/Index";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={CustomTheme}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <App />
      </Web3ReactProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
