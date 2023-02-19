import styled from "styled-components";
import { theme } from "@/style/theme";
import InfoteamLogo_Svg from "../assets/svgs/infoteamLogo.svg";
import { Link } from "react-router-dom";
import Search_Svg from "@/assets/svgs/login.svg";
import { useRef, useState } from "react";
import { isValidEmail } from "@/hooks/usePassCheck";
import { useLogin } from "@/hooks/useLogin";

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

const IDPBtn = styled.button<{
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

const SearchWrap = styled.div<{ borderColor: string }>`
  width: 75vw;
  display: flex;
  flex-direction: column;
  height: max-content;
  margin: 20px auto 0 auto;

  border-radius: 5px;
  border: 2px solid ${(props) => props.borderColor};
`;

const SearchInputWrap = styled.form`
  display: flex;
  flex-direction: row;
`;

const SearchInput = styled.input<{
  color: string;
  bgColor: string;
}>`
  width: calc(75vw - 60px);
  background-color: ${(props) => props.bgColor};
  height: 40px;
  padding-left: 15px;
  font-family: NSRegular;
  border: none;
  text-align: left;
  display: block;

  //폰트 크기
  font-size: 16px;
  color: ${(props) => props.color};
`;

const SearchBtnWrap = styled.button<{ bgColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border: none;
  background-color: ${(props) => props.bgColor};
`;

const SearchSvg = styled(theme.universalComponent.SvgIcon)`
  display: block;
  cursor: pointer;
`;

const NotPass = styled(theme.universalComponent.DivTextContainer)`
  text-align: center;
  width: 100vw;
  font-family: NSRegular;
  position: fixed;
  bottom: 30px;
`;

/** '강의평 쓰러가기' 버튼 */
const GoWriteBtn = styled(theme.universalComponent.DivTextContainer)<{
  bgColor: string;
}>`
  text-align: center;
  width: 250px;
  background-color: ${(props) => props.bgColor};
  height: 40px;
  line-height: 40px;
  font-family: NSBold;
  margin: 10px auto 0 auto;
`;

const PassWrap = styled(theme.universalComponent.DivTextContainer)`
  text-align: center;
  width: 100vw;
  font-family: NSRegular;
  position: fixed;
  bottom: 30px;
`;

const Version = styled(theme.universalComponent.DivTextContainer)`
  text-align: center;
  width: 100vw;
  font-family: NSBold;
`;

export default function Login() {
  const [pass, setPass] = useState<number>(0);
  const MailInputRef = useRef<HTMLInputElement>(null);
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = MailInputRef.current!.value;
    setPass(isValidEmail(enteredText));
  };
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

      <Version fontSize={12} color={theme.colors.secondary}>
        v0.1
      </Version>

      {/* <SearchWrap borderColor={theme.colors.inputBorder}>
        <SearchInputWrap onSubmit={submitHandler}>
          <SearchInput
            placeholder="이메일을 입력하세요"
            color={theme.colors.primaryText}
            bgColor={theme.colors.white}
            ref={MailInputRef}
          />
          <SearchBtnWrap bgColor={theme.colors.white}>
            <SearchSvg size={25} src={Search_Svg} />
          </SearchBtnWrap>
        </SearchInputWrap>
      </SearchWrap> */}

      <form
        action={`https://gistory-idp-fe.pages.dev`}
        style={{
          width: "60%",
        }}
      >
        <input
          type={"hidden"}
          name={"redirect_uri"}
          value={window.location.host}
        />
        <IDPBtn
          primaryColor={theme.colors.primary}
          bgColor={theme.colors.primaryText}
          color={theme.colors.white}
          type={"submit"}
        >
          <span>G</span>ISTORY로 로그인하기
        </IDPBtn>
      </form>

      {pass == 2 ? (
        <NotPass fontSize={12} color={theme.colors.primary}>
          유효하지 않은 이메일입니다. <br />
          아래 폼에서 강의평가 3개를 작성하고 와주세요.
          <GoWriteBtn
            fontSize={16}
            bgColor={theme.colors.primary}
            color={theme.colors.white}
            onClick={() => {
              window.open("https://forms.gle/DS4ZXU5xQ3UPbyR68");
            }}
          >
            강의평가 작성하러 가기
          </GoWriteBtn>
        </NotPass>
      ) : pass == 1 ? (
        <PassWrap fontSize={12} color={"#2ecc71"}>
          유효한 이메일입니다.
          <Link to={"/search"} style={{ textDecoration: "none" }}>
            <GoWriteBtn
              fontSize={16}
              bgColor={"#2ecc71"}
              color={theme.colors.white}
            >
              강의평가 보러가기
            </GoWriteBtn>
          </Link>
        </PassWrap>
      ) : null}
    </Wrap>
  );
}
