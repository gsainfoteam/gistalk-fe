import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import GlobalStyle from "./fonts/global";
import { ThemeProvider } from "styled-components";
import { theme } from "./style/theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "jotai";

import ClassEvaluation from "./pages/EvaluationPage/ClassEvaluation";
import ProfilePage from "./pages/ProfilePage";
import EmptyErrorPage from "./pages/EmptyErrorPage";
import { SearchPage } from "./pages/SearchPage";
import MainPage from "./pages/MainPage/MainPage";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/:id/evaluation" element={<ClassEvaluation />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/*" element={<EmptyErrorPage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
