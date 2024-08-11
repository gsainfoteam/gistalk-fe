import styled from "styled-components";
import { theme } from "@/style/theme";

import NavigationArrow_Svg from "@/assets/svgs/navigationArrow.svg";
import { IHeader } from "@/Interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import { FaHouse, FaHouseMedical } from "react-icons/fa6";

const Wrap = styled.div<{ bgColor: string }>`
  display: flex;
  align-items: center;
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

const NavigationHome = styled.div`
  margin-right: 10px;
`;

export default function NavigationHeader(props: IHeader) {
  const { prevUrl, text, isNavigateHome = false } = props;
  const navigate = useNavigate();

  return (
    <Wrap bgColor={theme.colors.white}>
      <div
        onClick={() => {
          prevUrl ? navigate(prevUrl) : navigate(-1);
        }}
      >
        <NavigationArrowSvg
          size={22}
          src={NavigationArrow_Svg}
        ></NavigationArrowSvg>
      </div>

      <NavigationText color={theme.colors.primaryText}>{text}</NavigationText>
      {isNavigateHome && (
        <NavigationHome
          onClick={() => {
            navigate("/");
          }}
        >
          <FaHouse size={20} />
        </NavigationHome>
      )}
    </Wrap>
  );
}
