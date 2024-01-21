import { theme } from "@/style/theme";
import React, { useState } from "react";
import styled from "styled-components";

interface CheckboxProps {
  text: string;
  id: number;
  selectedId: number | null;
  onCheckboxChange: (id: number) => void;
}

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 4px;
`;

const CheckboxInput = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid
    ${(props) =>
      props.checked ? theme.colors.primary : theme.colors.grayStroke};
  border-radius: 30%;
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
}) => {
  const isChecked = id === selectedId;

  const toggleCheckbox = () => {
    onCheckboxChange(id);
  };

  return (
    <CheckboxContainer onClick={toggleCheckbox}>
      <CheckboxInput type="checkbox" checked={isChecked} />
      <CheckboxText>{text}</CheckboxText>
    </CheckboxContainer>
  );
};

export default ProfessorNameCheckbox;
