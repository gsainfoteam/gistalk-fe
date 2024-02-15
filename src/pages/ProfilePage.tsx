import styled from "styled-components";
import { theme } from "@/style/theme";

import Button from "@/components/Button";

import NavigationArrow_Svg from "../assets/svgs/navigationArrow.svg";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/apis/auth";
import { useCheckValidToken } from "@/hooks/useCheckTokenValid";
import { FaArrowRightLong } from "react-icons/fa6";
import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRED_TIME,
} from "@/constants/localStorageKeys";
import { StyledLink } from "@components/StyledLink";
import Card from "@components/Card";

const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 1rem 0;
`;

/** 과목 이름과 코드를 감싸는 div. 과목과 이름이 같은 형태라서 재사용함 */
const SubjectTitle = styled(theme.universalComponent.DivTextContainer)`
  font-family: NSRegular;
  font-size: 20px;
  margin-bottom: 1rem;
`;

const MyReviewsText = styled(theme.universalComponent.DivTextContainer)`
  font-family: NSBold;
`;

const Semester = styled(theme.universalComponent.DivTextContainer)`
  display: flex;
  font-family: NSBold;
  width: 40vw;
  border-radius: 0;
  margin-bottom: 0.5em;
`;

const Subject = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  padding: 0.4em 0;
`;

const SubjectName = styled(theme.universalComponent.DivTextContainer)`
  font-family: NSRegular;
`;
const ProfessorName = styled(theme.universalComponent.DivTextContainer)`
  margin-left: 1em;
  font-family: NSMedium;
`;
const ArrowIcon = styled(theme.universalComponent.SvgIcon)`
  transform: rotate(180deg);
  margin-left: auto;
`;

const ContentWrap = styled.div``;

const SemesterEvaluationWrap = styled.div`
  margin-top: 1em;
`;

const MyEvaluationContainer = styled.div`
  margin: 0 auto 0 auto;
  background-color: ${theme.colors.cardBackGround};
  padding: 1em;
  border-radius: 10px;
`;

const InfoList = styled.div`
  margin: 0 auto 0 auto;
  padding: 0.5rem;
`;

const Info = styled.div`
  padding: 1em 0;
`;

const LoginGuideText = styled.div`
  font-family: NSRegular;
  font-size: 16px;
  color: ${theme.colors.primary};
  text-decoration: underline;
  cursor: pointer;
`;

const GuideToLogin = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default function ProfilePage() {
  const USER_NAME = "HongGilDong";
  const CLASS_LIST = [
    {
      id: 1,
      time: "2022년 1학기",
      subjects: [
        {
          className: "컴퓨터 프로그래밍",
          professor: "Suman Pandey",
        },
        {
          className: "일반물리학 및 연습",
          professor: "박찬용  ",
        },
      ],
    },
    {
      id: 2,
      time: "2022년 2학기",
      subjects: [
        {
          className: "컴퓨터 프로그래밍",
          professor: "Suman Pandey",
        },
        {
          className: "일반물리학 및 연습",
          professor: "박찬용  ",
        },
      ],
    },
  ];

  const MENU_TEXT = ["FAQ", "인포팀 소개"];

  const isValidToken = useCheckValidToken(); //토큰 유효성 검사

  const {
    isLoading: isUserInfoLoading,
    data,
    isError,
  } = useQuery({
    queryKey: [`getUserInfo`],
    queryFn: getUserInfo,
    retry: 0,
  });

  const { data: userInfo } = { ...data };

  console.log(userInfo);

  const logoutHandler = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(ACCESS_TOKEN_EXPIRED_TIME);
    alert("로그아웃 되었습니다");
    window.location.href = "/";
  };

  return (
    <>
      {isValidToken ? (
        <>
          <TitleWrap>
            <SubjectTitle fontSize={20} color={theme.colors.primaryText}>
              <span>{USER_NAME}</span> 님
            </SubjectTitle>

            <Button
              text="프로필 관리"
              onClick={() => {}}
              color={"white"}
              background={theme.colors.primary}
            />
          </TitleWrap>
          <ContentWrap>
            <MyEvaluationContainer>
              <MyReviewsText fontSize={16} color={theme.colors.primaryText}>
                작성한 강의평
              </MyReviewsText>

              {CLASS_LIST.map((list) => (
                <SemesterEvaluationWrap key={list.id}>
                  <Semester fontSize={14} color={theme.colors.primary}>
                    {list.time}
                  </Semester>
                  {list.subjects.map((subject, index) => (
                    <Subject key={index}>
                      <SubjectName
                        fontSize={16}
                        color={theme.colors.primaryText}
                      >
                        {subject.className}
                      </SubjectName>
                      <ProfessorName
                        fontSize={14}
                        color={theme.colors.grayStroke}
                      >
                        {subject.professor}
                      </ProfessorName>
                      <ArrowIcon size={12} src={NavigationArrow_Svg} />
                    </Subject>
                  ))}
                </SemesterEvaluationWrap>
              ))}
            </MyEvaluationContainer>
          </ContentWrap>
        </>
      ) : (
        <>
          <SubjectTitle fontSize={20} color={theme.colors.primaryText}>
            로그인하고 작성한 후기를 확인해보세요!
          </SubjectTitle>

          <StyledLink to="/login">
            <Card>
              <GuideToLogin>
                <LoginGuideText>바로 로그인하러 가기</LoginGuideText>

                <FaArrowRightLong />
              </GuideToLogin>
            </Card>
          </StyledLink>
        </>
      )}
      <ContentWrap>
        <InfoList>
          {MENU_TEXT.map((text, index) => (
            <Info key={index}>{text}</Info>
          ))}
          {isValidToken && <Info onClick={logoutHandler}>로그아웃</Info>}
        </InfoList>
      </ContentWrap>
    </>
  );
}
