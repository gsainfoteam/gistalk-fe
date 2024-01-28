import { Route, Routes } from "react-router-dom";

import ClassEvaluation from "./pages/EvaluationPage/ClassEvaluation";
import ProfilePage from "./pages/ProfilePage";
import EmptyErrorPage from "./pages/EmptyErrorPage";

import MainRouterPage from "./pages/MainRouterPage";
import styled from "styled-components";
import { WriteReviewPage } from "./pages/WriteReviewPage";
import { useAtom } from "jotai";
import { isLoggedInAtom } from "./store";
import LoginPage from "./pages/LoginPage/LoginPage";

//web-app style, max-width
const DefaultStyle = styled.div`
  width: 100%;
  max-width: 480px;
  margin: auto;
`;

function App() {
  const [isLoggedIn] = useAtom(isLoggedInAtom);

  return (
    <DefaultStyle>
      <Routes>
        <Route path="/" element={<MainRouterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/:id/evaluation" element={<ClassEvaluation />} />
        <Route path="/:id/write" element={<WriteReviewPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/*" element={<EmptyErrorPage />} />
      </Routes>
    </DefaultStyle>
  );
}

export default App;
