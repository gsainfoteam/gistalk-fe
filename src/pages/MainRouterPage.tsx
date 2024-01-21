import Header from "@components/Header";
import NavigationBar from "@components/NavigationBar";
import { useState } from "react";
import styled from "styled-components";
import ProfilePage from "./ProfilePage";
import MainPage from "./MainPage/MainPage";
import ComparePage from "./ComparePage";

const ContentContainer = styled.div`
  padding: 10px 5% 20px 5%;
`;

function MainRouterPage() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  return (
    <div>
      <Header />
      <ContentContainer>
        {activeTab === 0 && <MainPage />}
        {activeTab === 1 && <ComparePage />}
        {activeTab === 2 && <ProfilePage />}
      </ContentContainer>
      <NavigationBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}

export default MainRouterPage;
