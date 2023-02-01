import styled from "styled-components";
import { theme } from "../style/theme";
import InfoteamLogo_Svg from "../assets/svgs/infoteamLogo.svg";
import { Link } from "react-router-dom";

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogoWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const LogoSvg = styled(theme.universalComponent.SvgIcon)``;
const InfoteamText = styled(theme.universalComponent.DivTextContainer)`
  font-family: Aharoni;
`;
const GistalkText = styled(theme.universalComponent.DivTextContainer)<{
  bgColor: string;
}>`
  font-family: Aharoni;
  background-color: ${(props) => props.bgColor};
  border-radius: 0;
  padding: 7px 10px 1px 10px;
  text-align: center;
`;

const IDPBtn = styled(theme.universalComponent.DivTextContainer)<{
  bgColor: string;
  primaryColor: string;
}>`
  font-family: NSBold;
  background-color: ${(props) => props.bgColor};
  height: 3em;
  line-height: 3em;
  text-align: center;
  margin-top: 40px;
  padding: 0 40px;
  span {
    color: ${(props) => props.primaryColor};
  }
`;

export default function Onboarding() {
  return (
    <Wrap>
      <LogoWrap>
        <LogoSvg size={115} src={InfoteamLogo_Svg}></LogoSvg>
        <InfoteamText fontSize={33} color={theme.colors.primary}>
          INFOTEAM
        </InfoteamText>
        <GistalkText
          fontSize={26}
          bgColor={theme.colors.primary}
          color={theme.colors.white}
        >
          GISTALK
        </GistalkText>
      </LogoWrap>

      <Link to="/search">
        <IDPBtn
          primaryColor={theme.colors.primary}
          fontSize={18}
          bgColor={theme.colors.primaryText}
          color={theme.colors.white}
        >
          <span>G</span>ISTORY로 로그인하기
        </IDPBtn>{" "}
      </Link>
    </Wrap>
  );
}
