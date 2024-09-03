import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

import EmptyErrorPage from "./pages/EmptyErrorPage";
import MainRouterPage from "./pages/MainRouterPage";
import { WriteReviewGuidePage, WriteReviewPage } from "./pages/WriteReviewPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { SearchPage } from "./pages/SearchPage";
import { EvaluationPage } from "./pages/EvaluationPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import { useCheckValidToken } from "./hooks/useCheckTokenValid";

//web-app style, max-width
const DefaultStyle = styled.div`
  width: 100%;
  max-width: 480px;
  margin: auto;
`;

function App() {
  const isValidToken = useCheckValidToken();

  return (
    <DefaultStyle>
      <Routes>
        <Route path="/" element={<MainRouterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/evaluation/:id" element={<EvaluationPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/*" element={<EmptyErrorPage />} />
        {isValidToken ? (
          <>
            <Route path="/write/:id" element={<WriteReviewPage />} />
            <Route path="/write" element={<WriteReviewGuidePage />} />
          </>
        ) : (
          <>
            <Route path="/write/:id" element={<UnauthorizedPage />} />
            <Route path="/write" element={<UnauthorizedPage />} />
          </>
        )}
      </Routes>
    </DefaultStyle>
  );
}

export default App;
