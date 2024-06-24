import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { FaArrowRightLong } from "react-icons/fa6";

import { theme } from "@/style/theme";
import NavigationArrow_Svg from "../assets/svgs/navigationArrow.svg";
import { getUserEvaluations, getUserInfo } from "@/apis/auth";
import { useCheckValidToken } from "@/hooks/useCheckTokenValid";
import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRED_TIME,
} from "@/constants/localStorageKeys";
import { StyledLink } from "@components/StyledLink";
import Card from "@components/Card";
import { recordInfo, reviewInfo } from "@/Interfaces/interfaces";
import { convertSemesterToNumber } from "@/utils";

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
`;

const Info = styled.div`
  padding: 1em 0.5rem;
  //hover시 색상 변경
  &:hover {
    background-color: ${theme.colors.cardBackGround};
  }
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

const MENU_TEXT = [
  { text: "인포팀 소개", url: "https://introduce.gistory.me/" },
  { text: "문의하기", url: "https://cs.gistory.me?service=gistalk" },
];

export default function ProfilePage() {
  const isValidToken = useCheckValidToken(); //토큰 유효성 검사

  const { isLoading: isUserInfoLoading, data } = useQuery({
    queryKey: [`getUserInfo`],
    queryFn: getUserInfo,
    retry: 0,
    enabled: !!isValidToken,
  });

  const { isLoading: isUserEvaluationLoading, data: userEvaluationData } =
    useQuery({
      queryKey: [`userEvaluation`],
      queryFn: getUserEvaluations,
      retry: 0,
      enabled: !!isValidToken,
    });

  const { data: userInfo } = { ...data };
  const { data: userEvaluations } = { ...userEvaluationData };

  function groupByYearAndSemester( //0000년 00학기 형태로 나타내기 위해 년도, 학기로 묶어주는 함수
    data: recordInfo[]
  ): Record<string, Record<string, recordInfo[]>> {
    if (!data) return {};
    const groupedData: Record<string, Record<string, recordInfo[]>> = {};

    data.forEach((item) => {
      const yearKey = item.year;
      const semesterKey = item.semester.toString();

      if (!groupedData[yearKey]) {
        groupedData[yearKey] = {};
      }

      if (!groupedData[yearKey][semesterKey]) {
        groupedData[yearKey][semesterKey] = [];
      }

      groupedData[yearKey][semesterKey].push(item);
    });

    return groupedData;
  }

  const groupedData = groupByYearAndSemester(userEvaluations);

  const logoutHandler = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(ACCESS_TOKEN_EXPIRED_TIME);
    alert("로그아웃 되었습니다");
    window.location.href = "/";
  };

  const semesterArray = ["봄", "여름", "가을", "겨울"];

  return (
    <>
      {isValidToken ? (
        <>
          <TitleWrap>
            <SubjectTitle fontSize={20} color={theme.colors.primaryText}>
              {!isUserInfoLoading && data && (
                <>
                  <span>{userInfo.name}</span> 님, 안녕하세요
                </>
              )}
            </SubjectTitle>
          </TitleWrap>
          <ContentWrap>
            <MyEvaluationContainer>
              <MyReviewsText fontSize={16} color={theme.colors.primaryText}>
                작성한 강의평
              </MyReviewsText>

              {!isUserEvaluationLoading && userEvaluations.length === 0 && (
                <div>작성한 강의평이 없습니다.</div>
              )}

              {!isUserEvaluationLoading &&
                Object.entries(groupedData).map(([year, semesters]) => (
                  <div key={year}>
                    {Object.entries(semesters).map(([semester, subjects]) => (
                      <SemesterEvaluationWrap key={`${year}-${semester}`}>
                        <Semester fontSize={14} color={theme.colors.primary}>
                          {year}년{" "}
                          {semesterArray[convertSemesterToNumber(semester) - 1]}
                          학기
                        </Semester>
                        {subjects.map((subject, index) => (
                          <StyledLink to={`/${subject.lectureId}/evaluation`}>
                            <Subject key={index}>
                              <SubjectName
                                fontSize={16}
                                color={theme.colors.primaryText}
                              >
                                {subject.lectureProfessor.lecture.lectureName}
                              </SubjectName>
                              <ProfessorName
                                fontSize={14}
                                color={theme.colors.grayStroke}
                              >
                                {subject.lectureProfessor.professor.name}
                              </ProfessorName>
                              <ArrowIcon size={12} src={NavigationArrow_Svg} />
                            </Subject>
                          </StyledLink>
                        ))}
                      </SemesterEvaluationWrap>
                    ))}
                  </div>
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
          {MENU_TEXT.map((menu, index) => (
            <StyledLink key={index} to={menu.url}>
              <Info>{menu.text}</Info>
            </StyledLink>
          ))}
          {isValidToken && <Info onClick={logoutHandler}>로그아웃</Info>}
        </InfoList>
      </ContentWrap>
    </>
  );
}
