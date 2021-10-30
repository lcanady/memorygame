import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@emotion/react";
import { AnimatePresence } from "framer-motion";
import { Provider } from "react-redux";
import { store } from "./data/store";

const theme = {
  colors: {
    primary: "#fda214",
    active: "#152938",
    black: "#152938",
    white: "#fcfcfc",
    hover: "#6395B8",
    idle: "#BCCED9",
    primaryHover: "#FFB84A",
    secondary: "#DFE7EC",
    secondaryHover: "#6395B8",
    label: "#7191A5",
  },
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AnimatePresence>
          <App />
        </AnimatePresence>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
