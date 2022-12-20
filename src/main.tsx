import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import GlobalStyle from "./fonts/global";
import { ThemeProvider } from "styled-components";
import { theme } from "./style/theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Search from "../src/components/Search";
import ClassEvaluation from "./components/ClassEvaluation";
import ProfilePage from "./pages/ProfilePage";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/ClassEvaluation" element={<ClassEvaluation />} />
          <Route path="/Profile" element={<ProfilePage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
