import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import GlobalStyle from "./fonts/global";
import { ThemeProvider } from "styled-components";
import { theme } from "./style/theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Search from "./pages/Search";
import ClassEvaluation from "./pages/ClassEvaluation";
import ProfilePage from "./pages/ProfilePage";
import DetailedCE from "./pages/DetailedCE";
import Onboarding from "@/pages/Onboarding";
import Err404 from "@/pages/Err404";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/ClassEvaluation" element={<ClassEvaluation />} />
          <Route path="/Profile" element={<ProfilePage />} />
          <Route path="/DetailedCE" element={<DetailedCE />} />
          <Route path="/Onboarding" element={<Onboarding />} />
          <Route path="/404" element={<Err404 />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
