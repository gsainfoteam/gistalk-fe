import { borderRadius, inputSize, opacity, theme } from "@/style/theme";
import React from "react";
import styled, { css } from "styled-components";

interface CheckboxProps {
  text: string;
  id: number;
  selectedStatus: (number | null)[];
  onCheckboxChange: (id: number, profNumber: number) => void;
  profNumber: number;
  isWrite: boolean;
}

const CheckboxContainer = styled.label<{
  isClicked: boolean;
  color: string;
  vividColor: string;
  isWrite: boolean;
}>`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-left: 4px;
  padding-right: 4px;
  padding-top: 2px;
  padding-bottom: 2px;
  gap: 4px;
  background: ${(props) =>
    props.isClicked && !props.isWrite ? props.color : theme.colors.white};

  border-radius: 5px;
`;

const CheckboxInput = styled.input<{ color: string; isWrite: boolean }>`
  appearance: none;
  width: ${(props) => (props.isWrite ? inputSize.big : inputSize.small)};
  height: ${(props) => (props.isWrite ? inputSize.big : inputSize.small)};
  border: 2px solid ${theme.colors.grayStroke};
  border-radius: ${(props) =>
    props.isWrite ? borderRadius.circle : borderRadius.none};
  outline: none;
  cursor: pointer;

  &:checked {
    background-color: ${(props) =>
      props.isWrite ? theme.colors.primary : props.color};
    border: 1.5px solid
      ${(props) => (props.isWrite ? theme.colors.primary : props.color)};
  }
`;

const CheckboxText = styled.span`
  font-size: 15px;
  color: ${theme.colors.black};
`;

const ProfessorNameCheckbox: React.FC<CheckboxProps> = ({
  text,
  id,
  selectedStatus,
  onCheckboxChange,
  profNumber,
  isWrite,
}) => {
  const isChecked = id === selectedStatus[profNumber];

  const toggleCheckbox = () => {
    onCheckboxChange(id, profNumber);
  };
  return (
    <CheckboxContainer
      isClicked={isChecked}
      color={theme.RadarColor(opacity.background)[profNumber]}
      vividColor={theme.RadarColor(opacity.true)[profNumber]}
      isWrite={isWrite}
    >
      <CheckboxInput
        type="checkbox"
        checked={isChecked}
        color={theme.RadarColor(opacity.none)[profNumber]}
        onChange={toggleCheckbox}
        isWrite={isWrite}
      />
      <CheckboxText>{text}</CheckboxText>
    </CheckboxContainer>
  );
};

export default ProfessorNameCheckbox;
