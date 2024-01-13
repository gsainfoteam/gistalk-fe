import { zIndex } from "@/style/zIndex";
import styled from "styled-components";

const TabBarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  background-color: #f2f2f2;
  z-index: ${zIndex.UNDER_NAVIGATION}; /* Ensure it appears above other elements */
`;

const Tab = styled.div<{ active: boolean }>`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3%;
  font-size: 14px;
  color: ${(props) => (props.active ? "#333" : "#777")};
  svg {
    fill: ${(props) => (props.active ? "#333" : "#777")};
  }
`;

interface TabBarProps {
  activeTab: number;
  onTabChange: (tabIndex: number) => void;
}

function NavigationBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <TabBarContainer>
      <Tab active={activeTab === 0} onClick={() => onTabChange(0)}>
        강의평가
      </Tab>
      <Tab active={activeTab === 1} onClick={() => onTabChange(1)}>
        강의비교
      </Tab>
      <Tab active={activeTab === 2} onClick={() => onTabChange(2)}>
        개인설정
      </Tab>
    </TabBarContainer>
  );
}

export default NavigationBar;
