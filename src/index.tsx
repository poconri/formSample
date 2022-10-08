import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const colors = {
  indigoBlue: "#124E78",
  orangeYellow: "#F2BB05",
  lightYellow: "#F0F0C9",
  burntOrange: "#D74E09",
  bloodRed: "#6E0E0A",
  black: "#000000",
  white: "#ffffff",
};

const theme = extendTheme({ colors });

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
