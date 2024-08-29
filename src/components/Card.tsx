import { theme } from "@/style/theme";
import { ReactNode } from "react";
import styled, { css, keyframes } from "styled-components";

const cardFade = keyframes`
  0% {
    opacity: 0;
    height: 0;
  }
  30% {
    opacity: 1;
    height: 60px;
  }
  70% {
    opacity: 1;
    height: 60px;
  }
  100% {
    opacity: 0;
    height: 0;
  }
`;

// Styles for the container
const CardContainer = styled.div<{ 
  isInteractive: boolean, 
  isFade: boolean, 
  notFade: boolean; 
  }>`
  border-radius: 10px;
  background: ${theme.colors.cardBackGround};
  flex-shrink: 0;
  flex-grow: 1;
  ${(props) =>
    props.isInteractive &&
    css`:hover {
        background-color: ${theme.colors.inputBg};
        transition: 0.2s;
      }`}
  ${(props) => props.notFade 
    ? `padding: 20px;
      margin-bottom: 1em;`
    : 
      css`padding-left: 20px;
      padding-right: 20px;
      height: 0;
      opacity: 0;
      display: flex;
      place-items: center;
      animation-name: ${props.isFade ? cardFade : null};
      animation-duration: 2s;`}
`;

/**
 * @param isInteractive = true를 인자로 넣으면 hover시 카드의 배경색이 바뀐다(기본값 False)
 * wrapper로 넣고 싶은 내용을 Children으로 감싸서 사용
 */
function Card(
  props: 
  { children?: ReactNode; 
    isInteractive?: boolean; 
    isProfEmpty?: boolean; 
    isAllEmpty?: boolean; }) {
  const { children, isInteractive = false } = props;
  return (
    <CardContainer 
    isInteractive={isInteractive} 
    isFade={props.isProfEmpty ?? false} 
    notFade={props.isAllEmpty ?? true}
    >{children}</CardContainer>
  );
}

export default Card;
