import { borderRadius, inputSize, opacity, theme } from "@/style/theme";
import React from "react";
import styled, { css } from "styled-components";

interface CheckboxProps {
  text: string;
  id: number;
  selectedId: (number | null)[];
  onCheckboxChange: (id: number, profNumber: number) => void;
  profIndex: number;
  isWrite: boolean;
  evaluationEmptyList: boolean[];
}

const CheckboxContainer = styled.label<{ 
  isClicked: boolean, 
  color: string, 
  vividColor: string, 
  isWrite: boolean,
  isEvaluationEmpty: boolean
  }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-left: 4px;
  padding-right: 4px;
  padding-top: 2px;
  padding-bottom: 2px;
  gap: 4px;
  background: ${(props) => !props.isEvaluationEmpty &&
    ((props.isClicked && !props.isWrite) ? props.color : theme.colors.white)};
  border-radius: 5px;
`;

const CheckboxInput = styled.input<{ color: string, isWrite: boolean, isEvaluationEmpty: boolean }>`
  appearance: none;
  width: ${(props) => props.isWrite ? inputSize.big : inputSize.small};
  height: ${(props) => props.isWrite ? inputSize.big : inputSize.small};
  border: 2px solid ${theme.colors.grayStroke};
  border-radius: ${(props) => props.isWrite ? borderRadius.circle : borderRadius.none};
  outline: none;
  cursor: pointer;
  opacity: ${(props) => props.isEvaluationEmpty && opacity.true};

  ${(props) => !props.isEvaluationEmpty && `
    &:checked {
    background-color: ${props.isWrite ? theme.colors.primary : props.color};
    border: 1.5px solid ${props.isWrite ? theme.colors.primary : props.color};
    }
  `}
`;

const CheckboxText = styled.span<{ isEvaluationEmpty: boolean }>`
  font-size: 15px;
  color: ${(props) => props.isEvaluationEmpty ? theme.colors.grayStroke : theme.colors.black};
`;

const ProfessorNameCheckbox: React.FC<CheckboxProps> = ({
  text,
  id,
  selectedId,
  onCheckboxChange,
  profIndex,
  isWrite,
  evaluationEmptyList,
}) => {
  const isChecked = id === selectedId[profIndex];

  const toggleCheckbox = () => {
    onCheckboxChange(id, profIndex);
  };
  return (
    <CheckboxContainer
    isClicked={isChecked} 
    color={theme.RadarColor(opacity.background)[profIndex]} 
    vividColor={theme.RadarColor(opacity.true)[profIndex]}
    isWrite={isWrite}
    isEvaluationEmpty={evaluationEmptyList[profIndex]}
    >
      <CheckboxInput
        type="checkbox"
        checked={isChecked}
        color={theme.RadarColor(opacity.none)[profIndex]}
        onChange={toggleCheckbox}
        isWrite={isWrite}
        isEvaluationEmpty={evaluationEmptyList[profIndex]}
      />
      <CheckboxText isEvaluationEmpty={evaluationEmptyList[profIndex]}>{text}</CheckboxText>
    </CheckboxContainer>
  );
};

export default ProfessorNameCheckbox;
