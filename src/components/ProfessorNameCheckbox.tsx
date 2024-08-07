import { theme } from "@/style/theme";
import React from "react";
import styled from "styled-components";

interface CheckboxProps {
  text: string;
  id: number;
  selectedId: (number | null)[];
  onCheckboxChange: (id: number, profNumber: number) => void;
  profNumber: number;
  isWrite: boolean | undefined;
}

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 6px;
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

const ColorboxContainer = styled.button<{ isClicked: boolean, color: string }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 4px;
  padding-right: 4px;
  
  background: ${(props) => props.isClicked ? props.color : "white"};
  margin-left: 10px;
  border-radius: 5px;
  border: 0px;
`;

const BoxColor = styled.div<{ color: string }>`
  padding: 6px;
  margin-right: 3px;
  background: ${(props) => props.color};  
`;

const ColorboxText = styled.span<{ isClicked: boolean }>`
  font-size: 16px;
  color: ${theme.colors.black};
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

  if(isWrite) {
    return (
      <CheckboxContainer>
        <CheckboxInput
          type="checkbox"
          checked={isChecked}
          onChange={toggleCheckbox}
        />
        <CheckboxText>{text}</CheckboxText>
      </CheckboxContainer>
    );
  } else {
    return (
    <ColorboxContainer 
    isClicked={isChecked} 
    color={Object.values(theme.PrimaryOpaqueColor)[profNumber]} 
    onClick={toggleCheckbox}
    >
      <BoxColor color={Object.values(theme.PrimaryColor)[profNumber]} />
      <ColorboxText isClicked={isChecked}>{text}</ColorboxText>
    </ColorboxContainer>
    )
  }
};

export default ProfessorNameCheckbox;
