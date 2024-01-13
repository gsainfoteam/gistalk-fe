import Header from "@components/Header";
import NavigationBar from "@components/NavigationBar";
import { useState } from "react";
import styled from "styled-components";
import ProfilePage from "../ProfilePage";

const ContentContainer = styled.div`
  padding: 20px;
`;

function MainPage() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  return (
    <div>
      <Header />
      <ContentContainer>
        {activeTab === 0 && <div>Content for Tab 1</div>}
        {activeTab === 1 && <div>Content for Tab 2</div>}
        {activeTab === 2 && <ProfilePage />}
      </ContentContainer>
      <NavigationBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}

export default MainPage;
