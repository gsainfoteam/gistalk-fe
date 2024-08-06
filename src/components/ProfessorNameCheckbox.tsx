import { theme } from "@/style/theme";
import React from "react";
import styled from "styled-components";

interface CheckboxProps {
  text: string;
  id: number;
  selectedId: (number | null)[];
  onCheckboxChange: (id: number, profNumber: number) => void;
  profNumber: number;
}

const CheckboxContainer = styled.button<{ isClicked: boolean, color: string }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-left: 4px;
  padding-right: 4px;
  
  background: ${(props) => props.isClicked ? props.color : "white"};
  margin-left: 10px;
  border-radius: 5px;
  border: 1.5px solid ${theme.colors.grayStroke};
`;

const BoxColor = styled.div<{ color: string }>`
  padding: 6px;
  margin-right: 3px;
  background: ${(props) => props.color};  
`;

const CheckboxText = styled.span<{ isClicked: boolean }>`
  font-size: 16px;
  color: ${theme.colors.grayStroke};
`;

const ProfessorNameCheckbox: React.FC<CheckboxProps> = ({
  text,
  id,
  selectedId,
  onCheckboxChange,
  profNumber,
}) => {
  const isChecked = id === selectedId[profNumber];

  const toggleCheckbox = () => {
    onCheckboxChange(id, profNumber);
  };

  return (
    <CheckboxContainer 
    isClicked={isChecked} 
    color={Object.values(theme.PrimaryColor)[profNumber]} 
    onClick={toggleCheckbox}
    >
      <BoxColor color={Object.values(theme.PrimaryColor)[profNumber]} />
      <CheckboxText isClicked={isChecked}>{text}</CheckboxText>
    </CheckboxContainer>
  );
};

export default ProfessorNameCheckbox;
