import Header from "@components/Header";
import NavigationBar from "@components/NavigationBar";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ProfilePage from "./ProfilePage";
import MainPage from "./MainPage/MainPage";
import ComparePage from "./ComparePage";
import { useCheckValidToken } from "@/hooks/useCheckTokenValid";
import { useSearchParams } from "react-router-dom";
import { PROFILE_PAGE, HOME_PAGE } from "@/constants/pageQueryString";
import { COMPARE_INDEX, MAIN_INDEX, PROFILE_INDEX } from "@/constants/activeTabIndex";

const ContentContainer = styled.div`
  padding: 10px 1rem 4rem 1rem;
`;

function MainRouterPage() {
  const [RouterParams, setRouterParams] = useSearchParams();
  const activeTabQuery = RouterParams.get("tab") ?? "";

  const [activeTab, setActiveTab] = useState<number>();
  
  useEffect(() => {
    console.log("useEffect");
    if (activeTabQuery === PROFILE_PAGE) {
      handleTabChange(PROFILE_INDEX);
    }
    else if (activeTabQuery === HOME_PAGE) {
      handleTabChange(MAIN_INDEX);
    }
    }, [activeTabQuery]);

  const handleTabChange = (tabIndex: number) => {
    if (activeTab != tabIndex) setActiveTab(tabIndex);
  };

  const isValidToken = useCheckValidToken(); //토큰 유효성 검사

  return (
    <>
      <Header />
      <ContentContainer>
        {activeTab === MAIN_INDEX && <MainPage />}
        {activeTab === COMPARE_INDEX && <ComparePage />}
        {activeTab === PROFILE_INDEX && <ProfilePage />}
      </ContentContainer>
      <NavigationBar activeTab={activeTab} onTabChange={handleTabChange} />
    </>
  );
}

export default MainRouterPage;
