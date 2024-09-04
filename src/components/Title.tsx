import styled from "styled-components";

import { theme } from "@/style/theme";
import { lectureSectionInfo, professorInfo } from "@/Interfaces/interfaces";
import { extractProfessors } from "@/utils";
import ProfessorList from "./ProfessorList";
import { TitleSkeleton } from "@/pages/skeletonComponents/Title.skeleton";

interface IProps {
  subjectTitle: string | undefined;
  sectionInfo: lectureSectionInfo[] | undefined;
  subjectCode: string[] | null;
  selectedStatus?: (number | null)[];
  handleCheckboxChange: (id: number, profNumber: number) => void;
  isWrite: boolean;
  evaluationEmptyList?: boolean[];
  showProfessor?: boolean;
  isLoading: boolean;
}

const TitleWrap = styled.div<{
  color: string;
  bgColor: string;
  isBottomBorder: boolean;
}>`
  width: 100%;
  margin: 0 auto 0 auto;

  padding-top: 13px;
  padding-bottom: 13px;
  border-bottom: ${(props) => (props.isBottomBorder ? props.color : "white")}
    1.5px solid;
  border-radius: 0;
  background-color: ${(props) => props.bgColor};

  z-index: 10;

  div:nth-child(2) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

/** 과목 이름과 코드를 감싸는 div. 과목과 이름이 같은 형태라서 재사용함 */
const SubjectTitle = styled(theme.universalComponent.DivTextContainer)`
  font-family: NSBold;
  word-break: keep-all;
  margin-bottom: 3px;

  span {
    font-size: 14px;
    font-family: NSRegular;
    color: ${theme.colors.secondaryText};
  }
`;

/** 강의평가가 표시되는 title
 * @param subjectTitle 과목 이름
 * @param professorName 교수 이름
 * @param subjectCode 과목 코드
 */
export default function Title({
  subjectTitle,
  sectionInfo,
  subjectCode,
  selectedStatus,
  handleCheckboxChange,
  isWrite, //WriteReviewPage인지 EvaluationPage인지 구별해주는 boolean.
  evaluationEmptyList,
  showProfessor = true,
  isLoading,
}: IProps) {
  const professorInfoList =
    !isLoading && sectionInfo ? extractProfessors(sectionInfo) : [];

  return (
    <TitleWrap
      color={theme.colors.grayStroke}
      bgColor={theme.colors.white}
      isBottomBorder={!isLoading}
    >
      {isLoading ? (
        <TitleSkeleton />
      ) : (
        <>
          <SubjectTitle fontSize={20} color={theme.colors.primaryText}>
            {subjectTitle || "ERR"}{" "}
            <span>{subjectCode?.join(", ") || "ERR"}</span>
            {/* 비어 있는 string이라면 ERR을 출력하도록 함 */}
          </SubjectTitle>
          {showProfessor && selectedStatus && (
            <ProfessorList
              professorInfoList={professorInfoList}
              selectedStatus={selectedStatus}
              handleCheckboxChange={handleCheckboxChange}
              isWrite={isWrite}
              evaluationEmptyList={evaluationEmptyList}
            />
          )}
        </>
      )}
    </TitleWrap>
  );
}
