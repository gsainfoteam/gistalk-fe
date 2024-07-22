import Header from "@components/Header";
import NavigationBar from "@components/NavigationBar";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ProfilePage from "./ProfilePage";
import MainPage from "./MainPage/MainPage";
import ComparePage from "./ComparePage";
import { useCheckValidToken } from "@/hooks/useCheckTokenValid";
import { useSearchParams } from "react-router-dom";

const ContentContainer = styled.div`
  padding: 10px 1rem 4rem 1rem;
`;

function MainRouterPage() {
  const [RouterParams, setRouterParams] = useSearchParams();
  const activeTabQquery = RouterParams.get("page") ?? "";
  const [activeTab, setActiveTab] = useState<number>();

  useEffect(() => {
    if (activeTabQquery === "profile") {
    setActiveTab(2);
    }
    else if (activeTabQquery === "") {
      setActiveTab(0)
    }
    }, [activeTabQquery]);
  
  const handleTabChange = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  const isValidToken = useCheckValidToken(); //토큰 유효성 검사

  return (
    <>
      <Header />
      <ContentContainer>
        {activeTab === 0 && <MainPage />}
        {activeTab === 1 && <ComparePage />}
        {activeTab === 2 && <ProfilePage />}
      </ContentContainer>
      <NavigationBar activeTab={activeTab} onTabChange={handleTabChange} />
    </>
  );
}

export default MainRouterPage;
