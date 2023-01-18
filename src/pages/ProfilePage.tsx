import Hexagon from "@/components/Hexagon";
import { theme } from "@/style/theme";
import Header from "@/components/Header";
import styled from "styled-components";
import Button from "@/components/Button";
import QuestionMark_svg from "../assets/svgs/circledQuestionMark.svg";

const TitleWrap = styled.div<{ color: string }>`
  width: 87vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px auto 0 auto;
  padding-bottom: 13px;
  border-bottom: ${(props) => props.color} 1.5px solid;
  border-radius: 0;
`;

/** 과목 이름과 코드를 감싸는 div. 과목과 이름이 같은 형태라서 재사용함 */
const SubjectTitle = styled(theme.universalComponent.DivTextContainer)`
  font-family: NSBold;
`;

const MyReviewsText = styled(theme.universalComponent.DivTextContainer)`
  width: 87vw;
  height: 42px;
  font-family: NSBold;
  border-radius: 0;
  margin: 20px auto 0 auto;
  text-align: center;
  line-height: 42px;
`;

const Point = styled.div`
  display: flex;
  color: "gray";
  font: 12px;
  font-weight: bold;
`;

const PointValue = styled.div`
  display: flex;
  color: ${theme.colors.primary};
  font: 12px;
`;

const HelperIcon = styled(theme.universalComponent.SvgIcon)`
  margin-left: 4px;
`;

const Semester = styled(theme.universalComponent.DivTextContainer)`
  border-bottom: ${(props) => props.color} 1.5px solid;
  display: flex;
  font-family: NSBold;
  width: 40vw;
  border-radius: 0;
  padding-bottom: 0.5em;
`;

const Subject = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SubjectName = styled(theme.universalComponent.DivTextContainer)``;
const ProfessorName = styled(theme.universalComponent.DivTextContainer)``;
const ArrowIcon = styled.div``;
/** Radar Chart에 들어갈 임시 데이터 */

const ContentWrap = styled.div`
  width: 87vw;
  margin: 10px auto 0 auto;
`;

export default function ProfilePage() {
  const USER_NAME = "HongGilDong";
  const POINT_VALUE = 54;
  return (
    <>
      <Header text={"MY"} />
      <TitleWrap color={theme.colors.grayStroke}>
        <div>
          <SubjectTitle fontSize={16} color={theme.colors.primaryText}>
            ID: {USER_NAME}
          </SubjectTitle>
          <Point>
            <PointValue>{POINT_VALUE}</PointValue>
            <div>P</div>
            <HelperIcon src={QuestionMark_svg} size={16} />
          </Point>
        </div>

        <Button
          text="프로필 관리"
          onClick={() => {}}
          color={"white"}
          background={theme.colors.primary}
        />
      </TitleWrap>
      <ContentWrap>
        <MyReviewsText fontSize={16} color={theme.colors.primaryText}>
          · 내가 쓴 강의평 ·
        </MyReviewsText>
        <Semester fontSize={12} color={theme.colors.primary}>
          2022년 1학기
        </Semester>
        <Subject>
          <SubjectName fontSize={16} color={theme.colors.primaryText}>
            컴퓨터 프로그래밍
          </SubjectName>
          <ProfessorName fontSize={16} color={theme.colors.primaryText}>
            suman pandey
          </ProfessorName>
          <ArrowIcon> &gt; </ArrowIcon>
        </Subject>
      </ContentWrap>
    </>
  );
}
