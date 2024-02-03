import styled from "styled-components";
import { theme } from "@/style/theme";
import InfoteamLogo_Svg from "@/assets/svgs/infoteamLogo.svg";

import { useLogin } from "@/hooks/useLogin";
import { SCOPES } from "./LoginPage.const";
import { StyledLink } from "@components/StyledLink";

const Wrap = styled.div`
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

const IDPBtn = styled.button<{
  bgColor: string;
}>`
  font-weight: bold;
  background-color: ${(props) => props.bgColor};
  font-size: 16px;
  height: 3em;
  line-height: 3em;
  text-align: center;
  margin-top: 40px;
  padding: 0 40px;
  border-radius: 5px;
  color: white;
  border: none;
`;

const WithoutLoginButton = styled.div`
  font-weight: regular;
  font-family: NSRegular;
  color: ${theme.colors.secondaryText};
  margin-top: 14px;
  text-decoration: underline;
`;

export default function LoginPage() {
  useLogin();

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

      <form
        action={`https://idp.gistory.me/authorize?client_id=gistalk2023&scope=openid%20profile%20email%20student_id%20offline_access&response_type=code`}
      >
        {SCOPES.map((scope) => {
          return (
            <input
              key={scope.field}
              name={scope.field}
              value={scope.value}
              type={"hidden"}
            />
          );
        })}
        <IDPBtn
          bgColor={theme.colors.primary}
          color={theme.colors.white}
          type={"submit"}
        >
          GSA 통합 계정으로 로그인
        </IDPBtn>
      </form>
      <StyledLink to="/">
        <WithoutLoginButton>로그인 없이 이용하기</WithoutLoginButton>
      </StyledLink>
    </Wrap>
  );
}
