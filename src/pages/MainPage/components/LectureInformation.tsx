import RecommendationStatus from "@components/RecommendationStatus";
import styled from "styled-components";

const LectureInformationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LectureNameText = styled.span`
  font-size: 16px;
  font-weight: bold;
  margin-right: 5px;
`;

const ProfessorNameText = styled.span`
  font-size: 16px;
  margin-right: 5px;
  color: #959595;
`;

const CourseTakenTimeText = styled.span`
  font-size: 14px;
  color: #959595;
`;

interface LectureInformationProps {
  LectureName: string;
  ProfessorName: string;
  CourseTakenYear: number;
  CourseTakenSemester: number;
  CourseRecommendation: boolean | null;
}

const semester = ["봄", "여름", "가을", "겨울"];

function LectureInformation({
  LectureName,
  ProfessorName,
  CourseTakenYear,
  CourseTakenSemester,
  CourseRecommendation,
}: LectureInformationProps) {
  return (
    <LectureInformationWrapper>
      <div>
        <LectureNameText>{LectureName}</LectureNameText>
        <ProfessorNameText>{ProfessorName}</ProfessorNameText>
        <CourseTakenTimeText>
          {CourseTakenYear}년 {semester[CourseTakenSemester]}학기
        </CourseTakenTimeText>
      </div>

      <RecommendationStatus like={`${CourseRecommendation}`} />
    </LectureInformationWrapper>
  );
}
export default LectureInformation;
