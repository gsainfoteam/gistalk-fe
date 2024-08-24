import { borderRadius, inputSize, opacity } from "@/pages/EvaluationPage/EvaluationPage.const";
import { theme } from "@/style/theme";
import React from "react";
import styled, { css } from "styled-components";

interface CheckboxProps {
  text: string;
  id: number;
  selectedId: (number | null)[];
  onCheckboxChange: (id: number, profNumber: number) => void;
  profNumber: number;
  isWrite: boolean;
  isEvaluationEmpty: boolean[];
}

const CheckboxContainer = styled.label<{ 
  isClicked: boolean, 
  color: string, 
  vividColor: string, 
  isWrite: boolean, 
  isEvaluationEmpty: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-left: 4px;
  padding-right: 4px;
  padding-top: 2px;
  padding-bottom: 2px;
  gap: 4px;
  background: ${(props) => 
    (props.isClicked && 
    !props.isWrite &&
    !props.isEvaluationEmpty) ? props.color : theme.colors.white};

  border-radius: 5px;
`;

const CheckboxInput = styled.input<{ color: string, isWrite: boolean, isEvaluationEmpty: boolean }>`
  appearance: none;
  width: ${inputSize.big};
  height: ${inputSize.big};
  border: 2px solid ${theme.colors.grayStroke};
  border-radius: ${borderRadius.circle};
  outline: none;
  cursor: pointer;
  ${(props) => props.isEvaluationEmpty && css`opacity: 0.3;`}

  ${(props) => !props.isEvaluationEmpty &&
    css`
      &:checked {
      background-color: ${props.isWrite ? theme.colors.primary : props.color};
      border: 1.5px solid ${props.isWrite ? theme.colors.primary : props.color};
    }
    `
  }
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
  profNumber,
  isWrite,
  isEvaluationEmpty,
}) => {
  const isChecked = id === selectedId[profNumber];

  const toggleCheckbox = () => {
    onCheckboxChange(id, profNumber);
  };
  return (
    <CheckboxContainer
    isClicked={isChecked} 
    color={theme.RadarColor(opacity.background)[profNumber]} 
    vividColor={theme.RadarColor(opacity.true)[profNumber]}
    isWrite={isWrite}
    isEvaluationEmpty={isEvaluationEmpty[profNumber]}
    >
      <CheckboxInput
        type="checkbox"
        checked={isChecked}
        color={theme.RadarColor(opacity.none)[profNumber]}
        onChange={toggleCheckbox}
        isWrite={isWrite}
        isEvaluationEmpty={isEvaluationEmpty[profNumber]}
      />
      <CheckboxText isEvaluationEmpty={isEvaluationEmpty[profNumber]}>{text}</CheckboxText>
    </CheckboxContainer>
  );
};

export default ProfessorNameCheckbox;
