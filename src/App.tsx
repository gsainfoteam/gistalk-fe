import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

import ProfilePage from "./pages/ProfilePage";
import EmptyErrorPage from "./pages/EmptyErrorPage";
import MainRouterPage from "./pages/MainRouterPage";
import { WriteReviewPage } from "./pages/WriteReviewPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { SearchPage } from "./pages/SearchPage";
import { EvaluationPage } from "./pages/EvaluationPage";

//web-app style, max-width
const DefaultStyle = styled.div`
  width: 100%;
  max-width: 480px;
  margin: auto;
`;

function App() {
  return (
    <DefaultStyle>
      <Routes>
        <Route path="/" element={<MainRouterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/:id/evaluation" element={<EvaluationPage />} />
        <Route path="/:id/write" element={<WriteReviewPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/*" element={<EmptyErrorPage />} />
      </Routes>
    </DefaultStyle>
  );
}

export default App;
