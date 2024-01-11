import styled from "styled-components";
import { theme } from "@/style/theme";

import NavigationArrow_Svg from "@/assets/svgs/navigationArrow.svg";
import { IHeader } from "@/Interfaces/interfaces";
import { useNavigate } from "react-router-dom";

const Wrap = styled.div<{ bgColor: string }>`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 60px;
  background-color: ${(props) => props.bgColor};
`;

const NavigationArrowSvg = styled(theme.universalComponent.SvgIcon)`
  margin-left: 13px;
`;
const NavigationText = styled.div<{ color: string }>`
  flex: 1;
  font-family: NSRegular;
  color: ${(props) => props.color};
  font-size: 20px;
  padding-right: 30px;
  text-align: center;
`;

export default function NavigationHeader({ text }: IHeader) {
  const navigate = useNavigate();

  return (
    <Wrap bgColor={theme.colors.white}>
      <div
        onClick={() => {
          navigate(-1);
        }}
      >
        <NavigationArrowSvg
          size={22}
          src={NavigationArrow_Svg}
        ></NavigationArrowSvg>
      </div>

      <NavigationText color={theme.colors.primaryText}>{text}</NavigationText>
    </Wrap>
  );
}
