import { opacity } from "@/pages/EvaluationPage/EvaluationPage.const";
import { theme } from "@/style/theme";
import React from "react";
import styled from "styled-components";

interface CheckboxProps {
  text: string;
  id: number;
  selectedId: (number | null)[];
  onCheckboxChange: (id: number, profNumber: number) => void;
  profNumber: number;
  isWrite: boolean;
}

const CheckboxContainer = styled.label<{ isClicked: boolean, color: string, isWrite: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 4px;

  border-bottom: 2px solid ${(props) => (props.isClicked && !props.isWrite) ? props.color : "white"};
`;

const CheckboxInput = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid
    ${(props) =>
      props.checked ? theme.colors.primary : theme.colors.grayStroke};
  border-radius: 10px;
  outline: none;
  margin-right: 3px;
  cursor: pointer;

  &:checked {
    background-color: ${theme.colors.primary};
  }
`;

const CheckboxText = styled.span`
  font-size: 16px;
`;

const ProfessorNameCheckbox: React.FC<CheckboxProps> = ({
  text,
  id,
  selectedId,
  onCheckboxChange,
  profNumber,
  isWrite,
}) => {
  const isChecked = id === selectedId[profNumber];

  const toggleCheckbox = () => {
    onCheckboxChange(id, profNumber);
  };
  return (
    <CheckboxContainer
    isClicked={isChecked} 
    color={Object.values(theme.RadarColor(opacity.true))[profNumber]} 
    isWrite={isWrite}
    >
      <CheckboxInput
        type="checkbox"
        checked={isChecked}
        onChange={toggleCheckbox}
      />
      <CheckboxText>{text}</CheckboxText>
    </CheckboxContainer>
  );
};

export default ProfessorNameCheckbox;
