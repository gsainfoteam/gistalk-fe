import { zIndex } from "@/style/zIndex";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaChartLine, FaList } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import { theme } from "@/style/theme";
import {
  CURRENT_SEMESTER_INDEX,
  MAIN_INDEX,
  PROFILE_INDEX,
} from "@/constants/activeTabIndex";

const TabBarContainer = styled.div<{ isScrolled: boolean }>`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  background-color: white;
  z-index: ${zIndex.UNDER_NAVIGATION};
  opacity: ${(props) => (props.isScrolled ? 0.7 : 1)};
  transition: opacity 0.3s ease;
  border-top: 1px solid #ddd;
`;

const Tab = styled.div<{ active: boolean }>`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  font-size: 14px;
  color: ${(props) => (props.active ? "#333" : theme.colors.secondaryText)};
  svg {
    fill: ${(props) => (props.active ? "#333" : "#777")};
    margin-bottom: 2px;
  }
`;

interface TabBarProps {
  activeTab: number | undefined;
  onTabChange: (tabIndex: number) => void;
}

function NavigationBar({ activeTab, onTabChange }: TabBarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <TabBarContainer isScrolled={isScrolled}>
      <Tab
        active={activeTab === MAIN_INDEX}
        onClick={() => onTabChange(MAIN_INDEX)}
      >
        <FaChartLine size={20} />
        강의평가
      </Tab>
      {/* <Tab active={activeTab === 1} onClick={() => onTabChange(1)}>
        강의비교
      </Tab> */}
      <Tab
        active={activeTab === CURRENT_SEMESTER_INDEX}
        onClick={() => onTabChange(CURRENT_SEMESTER_INDEX)}
      >
        <FaList size={20} />
        가을학기 강의
      </Tab>
      <Tab
        active={activeTab === PROFILE_INDEX}
        onClick={() => onTabChange(PROFILE_INDEX)}
      >
        <FaCircleUser size={20} />
        사용자 정보
      </Tab>
    </TabBarContainer>
  );
}

export default NavigationBar;
