import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import { theme } from "@/style/theme";
import NavigationArrow_Svg from "../assets/svgs/navigationArrow.svg";
import { useNavigate } from "react-router-dom";

interface IProps {
  title: string;
  professor: string;
}

const Wrap = styled.div<{
  scroll: number;
  bgColor: string;
  borderColor: string;
}>`
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 480px;
  height: 50px;
  margin: 0 auto;
  display: flex;
  background-color: ${(props) => props.bgColor};
  border-bottom: 2px solid ${(props) => props.borderColor};
  border-radius: 0;
  z-index: 100;
  opacity: ${(props) => (props.scroll > 200 ? 1 : 0)};
  transition: opacity 0.3s ease;
  align-items: center;
  justify-content: space-around;
`;

const NavigationArrowSvg = styled(theme.universalComponent.SvgIcon)`
  margin-left: 13px;
`;

const WhiteShadowBox = styled.div<{ bgColor: string; left: boolean }>`
  position: absolute;
  left: 0;
`;

const Title = styled(theme.universalComponent.DivTextContainer)<{
  animate: boolean;
}>`
  font-family: NSBold;
`;

/** 아래로 스크롤했을때 상단에 고정된 sticky한 헤더 */
export default function ScrolledHeader({ title, professor }: IProps) {
  const [scroll, setScroll] = useState(0);

  const navigate = useNavigate();
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
  if (title.length + professor.length + 3 > 17) {
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
          onClick={() => {
            navigate(-1);
          }}
          size={22}
          src={NavigationArrow_Svg}
        />
      </WhiteShadowBox>
      <Title fontSize={16} color={theme.colors.primaryText} animate={animate}>
        {title}
      </Title>
    </Wrap>
  );
}
