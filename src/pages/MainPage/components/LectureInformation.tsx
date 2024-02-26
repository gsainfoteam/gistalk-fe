import RecommendationStatus from "@components/RecommendationStatus";
import styled from "styled-components";

const LectureInformationWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
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

const RecommendWrapper = styled.div`
  margin-top: 5px;
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
    <>
      <LectureInformationWrapper>
        <LectureNameText>{LectureName}</LectureNameText>
        <ProfessorNameText>{ProfessorName}</ProfessorNameText>
        <CourseTakenTimeText>
          {CourseTakenYear}년{" "}
          {CourseTakenSemester !== 5 &&
            `${semester[CourseTakenSemester - 1]}학기`}
        </CourseTakenTimeText>
      </LectureInformationWrapper>

      <RecommendWrapper>
        <RecommendationStatus like={`${CourseRecommendation}`} />
      </RecommendWrapper>
    </>
  );
}
export default LectureInformation;
