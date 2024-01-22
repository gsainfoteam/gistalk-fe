import styled from "styled-components";
import { theme } from "@/style/theme";
import ProfessorNameCheckbox from "../pages/EvaluationPage/components/ProfessorNameCheckbox";
import { useState } from "react";
import useSubjectCode from "@/hooks/useSubjectCode";

interface IProps {
  subjectTitle: string;
  professorName: string;
  subjectCode: string[];
}

const TitleWrap = styled.div<{ color: string; bgColor: string }>`
  width: 100%;
  margin: 0 auto 0 auto;

  padding-top: 13px;
  padding-bottom: 13px;
  border-bottom: ${(props) => props.color} 1.5px solid;
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

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

/** 강의평가가 표시되는 title
 * @param subjectTitle 과목 이름
 * @param professorName 교수 이름
 * @param subjectCode 과목 코드
 */
export default function Title({
  subjectTitle,
  professorName,
  subjectCode,
}: IProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const extractedSubjectCode = useSubjectCode(subjectCode);

  const handleCheckboxChange = (id: number) => {
    setSelectedId(id === selectedId ? null : id);
  };

  const PROF_NAMES = ["김길동", "박길동", professorName];

  return (
    <TitleWrap color={theme.colors.grayStroke} bgColor={theme.colors.white}>
      <SubjectTitle fontSize={20} color={theme.colors.primaryText}>
        {subjectTitle || "ERR"} <span> {subjectCode || "ERR"}</span>
        {/* 비어 있는 string이라면 ERR을 출력하도록 함 */}
      </SubjectTitle>
      <div>
        <CheckboxContainer>
          <SubjectTitle fontSize={14} color={theme.colors.secondaryText}>
            교수자
          </SubjectTitle>

          {PROF_NAMES.map((text: string, index: number) => (
            <ProfessorNameCheckbox
              key={index}
              text={text}
              id={index}
              selectedId={selectedId}
              onCheckboxChange={handleCheckboxChange}
            />
          ))}
        </CheckboxContainer>
      </div>
    </TitleWrap>
  );
}
