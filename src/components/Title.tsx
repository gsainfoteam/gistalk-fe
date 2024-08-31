import styled from "styled-components";

import { theme } from "@/style/theme";
import { LectureSectionInfo, professorInfo } from "@/Interfaces/interfaces";
import ProfessorNameCheckbox from "./ProfessorNameCheckbox";
import { extractProfessors } from "@/utils";
import { showSkeleton } from "@/pages/skeletonComponents/Keyframes";
import { SkeletonDiv } from "@/pages/skeletonComponents/Skeleton.styled";

interface IProps {
  subjectTitle: string | undefined;
  sectionInfo: LectureSectionInfo[] | undefined;
  subjectCode: string[] | undefined;
  selectedId: (number | null)[];
  handleCheckboxChange: (id: number, profNumber: number) => void;
  isWrite: boolean;
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
  border-bottom: ${(props) => props.isBottomBorder ? props.color : "white"} 1.5px solid;
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
const SubjectTitle = styled(theme.universalComponent.DivTextContainer)<{isSkeleton?: boolean;}>`
  font-family: NSBold;
  word-break: keep-all;
  margin-bottom: 3px;

  span {
    font-size: 14px;
    font-family: NSRegular;
    color: ${theme.colors.secondaryText};
  }

  ${(props) => showSkeleton(props.isSkeleton ?? false)};
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
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
  selectedId,
  handleCheckboxChange,
  isWrite, //WriteReviewPage인지 EvaluationPage인지 구별해주는 boolean.
  isLoading,
}: IProps) {
  const professorInfoList = !isLoading && sectionInfo ? extractProfessors(sectionInfo) : undefined;

  return (
    <TitleWrap 
      color={theme.colors.grayStroke} 
      bgColor={theme.colors.white} 
      isBottomBorder={!isLoading}
      >
      <SubjectTitle fontSize={20} color={theme.colors.primaryText} isSkeleton={isLoading}>
        {isLoading ? <>&nbsp;</> : subjectTitle || "ERR"} 
        <span> {isLoading ? <>&nbsp;</> : subjectCode?.join(", ") || "ERR"}</span>
        {/* 비어 있는 string이라면 ERR을 출력하도록 함 */}
      </SubjectTitle>
      <div>
        <CheckboxContainer>
          <SubjectTitle fontSize={14} color={theme.colors.secondaryText} isSkeleton={isLoading}>
          {isLoading ? <div>&emsp;&emsp;&ensp;</div> : <>교수자</>}
          </SubjectTitle>

          {professorInfoList 
          ? professorInfoList.map(
            (professorInfo: professorInfo, index: number) => (
              <ProfessorNameCheckbox
                key={professorInfo.id}
                text={professorInfo.name}
                id={professorInfo.id}
                selectedId={selectedId}
                onCheckboxChange={handleCheckboxChange}
                profNumber={index}
                isWrite={isWrite}
              />
            )
          )
          : <SkeletonDiv isSkeleton={isLoading} widthSize="300px" heightSize="25px"/>}
        </CheckboxContainer>
      </div>
    </TitleWrap>
  );
}
