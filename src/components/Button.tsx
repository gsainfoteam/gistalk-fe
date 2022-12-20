import styled from "styled-components";
import { IButton } from "../Interfaces/interfaces";

const StyledButton = styled.button<{ color: string; background: string }>`
  color: ${(props) => props.color || "gray"};
  background: ${(props) => props.background || "white"};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

export default function Button({ text, onClick, color, background }: IButton) {
  return (
    <>
      <StyledButton color={color} background={background} onClick={onClick}>
        {text}
      </StyledButton>
    </>
  );
}
