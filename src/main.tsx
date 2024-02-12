import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import GlobalStyle from "./fonts/global";
import { ThemeProvider } from "styled-components";
import { theme } from "./style/theme";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "jotai";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
