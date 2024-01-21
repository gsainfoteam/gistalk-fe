import styled from "styled-components";
import { theme } from "@/style/theme";

import Button from "@/components/Button";

import NavigationArrow_Svg from "../assets/svgs/navigationArrow.svg";

const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto 0 auto;
`;

/** 과목 이름과 코드를 감싸는 div. 과목과 이름이 같은 형태라서 재사용함 */
const SubjectTitle = styled(theme.universalComponent.DivTextContainer)`
  font-family: NSRegular;
  span {
    font-family: NSBold;
  }
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
  font-family: NSBold;
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
  padding: 4%;
  border-radius: 10px;
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
  return (
    <>
      <TitleWrap>
        <div>
          <SubjectTitle fontSize={20} color={theme.colors.primaryText}>
            <span>{USER_NAME}</span> 님
          </SubjectTitle>
        </div>
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
              {list.subjects.map((subject) => (
                <Subject>
                  <SubjectName fontSize={16} color={theme.colors.primaryText}>
                    {subject.className}
                  </SubjectName>
                  <ProfessorName fontSize={14} color={theme.colors.grayStroke}>
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
  );
}
