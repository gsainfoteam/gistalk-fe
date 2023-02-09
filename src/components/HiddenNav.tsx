import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import { theme } from "@/style/theme";
import NavigationArrow_Svg from "../assets/svgs/navigationArrow.svg";

interface IProps {
  avgScore:number,
  title:string,
  professor:string
}

const Wrap = styled.div<{
  scroll: number;
  bgColor: string;
  borderColor: string;
}>`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 50px;
  background-color: ${(props) => props.bgColor};
  border-bottom: 2px solid ${(props) => props.borderColor};
  border-radius: 0;
  z-index: 100;

  display: ${(props) => (props.scroll > 200 ? "flex" : "none")};
  align-items: center;
  justify-content: center;
`;

const NavigationArrowSvg = styled(theme.universalComponent.SvgIcon)`
  margin-left: 13px;
`;

const AvgScoreWrap = styled.div`
  text-align: center;
  height: min-content;
  margin-right: 13px;
`;

const AvgScoreText = styled(theme.universalComponent.DivTextContainer)`
  font-family: NSMedium;
  position: relative;
  top: 2px;
`;
const AvgScoreNumber = styled(theme.universalComponent.DivTextContainer)`
  font-family: NSBold;
  position: relative;
  top: -1px;
`;

const WhiteShadowBox = styled.div<{ bgColor: string; left: boolean }>`
  height: 50px;
  min-width: 60px;
  background-color: ${(props) => props.bgColor};
  border-radius: 0;
  box-shadow: ${(props) =>
    props.left
      ? `14px 0 8px -5px ${props.bgColor}`
      : `-14px 0 8px -5px ${props.bgColor}`};
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.left ? "left" : "right")};
  z-index: 200;
  position:absolute;

  ${props => props.left ? "left : 0;" : "right : 0;"}
`;

const TextLoop = keyframes`
  0% {
    transform: translateX(-70%);
  }
  100% {
    transform: translateX(70%);
  }
`;

const Title = styled(theme.universalComponent.DivTextContainer)<{ animate:boolean }>`
  font-family: NSBold;
  white-space: nowrap;
  padding-left : ${props => props.animate ? "100%" : "0"};
  animation: ${TextLoop} 10s linear infinite;
  ${props => !props.animate && `animation : none;`}
`;

export default function HiddenNav({avgScore, title, professor}:IProps) {
  const [scroll, setScroll] = useState(0);
  const onScroll = () => {
    setScroll(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.addEventListener("scroll", onScroll);
    };
  }, []);

  let animate = false;
  if(title.length + professor.length + 3 > 17){
    animate = true;
  }

  return (
    <Wrap
      scroll={scroll}
      bgColor={theme.colors.white}
      borderColor={theme.colors.primary}
    >
      <WhiteShadowBox left={true} bgColor={theme.colors.white}>
        <NavigationArrowSvg
          size={22}
          src={NavigationArrow_Svg}
        ></NavigationArrowSvg>
      </WhiteShadowBox>
      <Title fontSize={16} color={theme.colors.primaryText} animate={animate}>
        {title} - {professor}
      </Title>
      <WhiteShadowBox left={false} bgColor={theme.colors.white}>
        <AvgScoreWrap>
          <AvgScoreText fontSize={12} color={theme.colors.secondaryText}>
            평균
          </AvgScoreText>
          <AvgScoreNumber fontSize={14} color={theme.colors.primary}>
            {avgScore}
          </AvgScoreNumber>
        </AvgScoreWrap>
      </WhiteShadowBox>
    </Wrap>
  );
}
