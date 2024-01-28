import { Route, Routes } from "react-router-dom";

import ClassEvaluation from "./pages/EvaluationPage/ClassEvaluation";
import ProfilePage from "./pages/ProfilePage";
import EmptyErrorPage from "./pages/EmptyErrorPage";
import { SearchPage } from "./pages/SearchPage";
import MainRouterPage from "./pages/MainRouterPage";
import styled from "styled-components";
import { WriteReviewPage } from "./pages/WriteReviewPage";
import LoginPage from "./pages/LoginPage";

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
        <Route path="/search" element={<SearchPage />} />
        <Route path="/:id/evaluation" element={<ClassEvaluation />} />
        <Route path="/:id/write" element={<WriteReviewPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<EmptyErrorPage />} />
      </Routes>
    </DefaultStyle>
  );
}

export default App;
