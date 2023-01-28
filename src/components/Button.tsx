import styled from "styled-components";
import { IButton } from "../Interfaces/interfaces";

const StyledButton = styled.button<{ color: string; background: string }>`
  color: ${(props) => props.color || "gray"};
  background: ${(props) => props.background || "white"};
  font-size: 14px;
  margin: 1em;
  padding: 0.25em 0.5em;
  border: 2px solid ${(props) => props.background || "white"};
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
