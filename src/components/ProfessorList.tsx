import styled from "styled-components";

import { theme } from "@/style/theme";
import { professorInfo } from "@/Interfaces/interfaces";
import ProfessorNameCheckbox from "./ProfessorNameCheckbox";

interface IProps {
  professorInfoList: professorInfo[];
  selectedId: (number | null)[];
  handleCheckboxChange: (id: number, profNumber: number) => void;
  isWrite: boolean;
}

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
  flex-wrap: wrap;
  gap: 4px;
`;

export default function ProfessorList({
  professorInfoList,
  selectedId,
  handleCheckboxChange,
  isWrite, //WriteReviewPage인지 EvaluationPage인지 구별해주는 boolean.
}: IProps) {
  return (
    <div>
      <CheckboxContainer>
        <SubjectTitle fontSize={14} color={theme.colors.secondaryText}>
          교수자
        </SubjectTitle>

        {professorInfoList.map(
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
        )}
      </CheckboxContainer>
    </div>
  );
}
