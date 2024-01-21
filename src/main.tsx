import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import GlobalStyle from "./fonts/global";
import { ThemeProvider } from "styled-components";
import { theme } from "./style/theme";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "jotai";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
