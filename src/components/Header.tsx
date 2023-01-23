import styled from "styled-components";
import { theme } from "../style/theme";

import NavigationArrow_Svg from "../assets/svgs/navigationArrow.svg";
import { IHeader } from "../Interfaces/interfaces";
import { Link } from "react-router-dom";

const Wrap = styled.div<{ bgColor: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100vw;
  height: 60px;
  position: sticky;
  position: -webkit-sticky;
  top: 0px;
  background-color: ${(props) => props.bgColor};
  z-index: 100;
`;

const NavigationArrowSvg = styled(theme.universalComponent.SvgIcon)`
  margin-left: 17px;
`;
const NavigationText = styled.div<{ color: string }>`
  font-family: NSBold;
  color: ${(props) => props.color};
  font-size: 20px;
  margin-right: 23px;
`;

export default function Header({ text }: IHeader) {
  return (
    <Wrap bgColor={theme.colors.white}>
      <Link to="/">
        <NavigationArrowSvg
          size={22}
          src={NavigationArrow_Svg}
        ></NavigationArrowSvg>
      </Link>
      <NavigationText color={theme.colors.primaryText}>{text}</NavigationText>
    </Wrap>
  );
}