import styled from "styled-components";
import { theme } from "@/style/theme";
import InfoteamLogo_Svg from "@assets/svgs/infoteamLogo.svg";

import { IHeader } from "@/Interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import { StyledLink } from "./StyledLink";

export const TopWrap = styled.div`
  margin: 10px auto 0 auto;
  padding: 22px 5%;
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
      <StyledLink to="/">
        <LogoWrap color={theme.colors.primary}>
          <LogoSvg src={InfoteamLogo_Svg} size={35}></LogoSvg>
          GISTALK
        </LogoWrap>
      </StyledLink>
    </TopWrap>
  );
}
