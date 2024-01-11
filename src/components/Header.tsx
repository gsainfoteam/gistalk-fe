import styled from "styled-components";
import { theme } from "@/style/theme";
import InfoteamLogo_Svg from "@assets/svgs/infoteamLogo.svg";

import { IHeader } from "@/Interfaces/interfaces";
import { useNavigate } from "react-router-dom";

export const TopWrap = styled.div`
  width: 87vw;
  margin: 10px auto 0 auto;
  padding: 22px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

/** 지스톡 로고 (아이콘, 텍스트) 같이 있는 Wrap */
export const LogoWrap = styled.div<{ color: string }>`
  font-family: Aharoni;
  color: ${(props) => props.color};
  font-size: 18px;
  display: flex;
  align-items: center;
`;

export const LogoSvg = styled(theme.universalComponent.SvgIcon)`
  margin-right: 7px;
`;

export default function Header() {
  return (
    <TopWrap>
      <LogoWrap color={theme.colors.primary}>
        <LogoSvg src={InfoteamLogo_Svg} size={35}></LogoSvg>
        GISTALK
      </LogoWrap>
    </TopWrap>
  );
}
