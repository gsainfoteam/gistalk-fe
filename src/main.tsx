import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import GlobalStyle from "./fonts/global";
import { ThemeProvider } from "styled-components";
import { theme } from "./style/theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Search from "./pages/Search";
import ClassEvaluation from "./pages/ClassEvaluation";
import DetailedCE from "./pages/DetailedCE";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/ClassEvaluation" element={<ClassEvaluation />} />
          <Route path="/DetailedCE" element={<DetailedCE />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
