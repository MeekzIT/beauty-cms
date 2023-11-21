import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/index";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import "./index.css";
import ScrollToTop from "./components/scroll-to-top/ScrollToTop";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2C2125",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ScrollToTop />
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);
