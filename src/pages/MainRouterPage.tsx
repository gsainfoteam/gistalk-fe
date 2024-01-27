import Header from "@components/Header";
import NavigationBar from "@components/NavigationBar";
import { useState } from "react";
import styled from "styled-components";
import ProfilePage from "./ProfilePage";
import MainPage from "./MainPage/MainPage";
import ComparePage from "./ComparePage";

const ContentContainer = styled.div`
  padding: 10px 1rem 20px 1rem;
`;

function MainRouterPage() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

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
