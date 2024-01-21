import { zIndex } from "@/style/zIndex";
import { useEffect, useState } from "react";
import styled from "styled-components";

const TabBarContainer = styled.div<{ isScrolled: boolean }>`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  background-color: #f2f2f2;
  z-index: ${zIndex.UNDER_NAVIGATION};
  opacity: ${(props) => (props.isScrolled ? 0.7 : 1)};
  transition: opacity 0.3s ease;
`;

const Tab = styled.div<{ active: boolean }>`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
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
