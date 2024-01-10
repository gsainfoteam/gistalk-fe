import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import GlobalStyle from "./fonts/global";
import { ThemeProvider } from "styled-components";
import { theme } from "./style/theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ClassEvaluation from "./pages/EvaluationPage/ClassEvaluation";
import ProfilePage from "./pages/ProfilePage";
import Login from "@/pages/Login";
import Err404 from "@/pages/Err404";
import { Provider } from "jotai";
import { Search } from "./pages/SearchPage";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/search" element={<Search />} />
            <Route path="/:id/evaluation" element={<ClassEvaluation />} />
            <Route path="/profile" element={<ProfilePage />} />
            {/*<Route path="/" element={<Login />} />*/}
            <Route path="/*" element={<Err404 />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
