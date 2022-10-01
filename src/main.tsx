import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import GlobalStyle from "./fonts/global";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Search from "../src/components/Search";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Search />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
