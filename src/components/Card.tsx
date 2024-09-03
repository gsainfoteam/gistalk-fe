import { showSkeleton, skeletonCardGradient, skeletonGradient } from "@/pages/skeletonComponents/Keyframes";
import { theme } from "@/style/theme";
import { ReactNode } from "react";
import styled, { css } from "styled-components";

// Styles for the container
const CardContainer = styled.div<{ isInteractive: boolean; isWhite: boolean; }>`
  border-radius: 10px;
  background: ${theme.colors.cardBackGround};
  padding: 20px;
  margin-bottom: 1em;
  flex-shrink: 0;
  flex-grow: 1;
  ${(props) =>
    props.isInteractive &&
    `:hover {
        background-color: ${theme.colors.inputBg};
        transition: 0.2s;
      }
    `}
  ${(props) => props.isWhite && 
    css`animation: ${skeletonCardGradient} 1.5s infinite ease-in-out;`};
`;

/**
 * @param isInteractive = true를 인자로 넣으면 hover시 카드의 배경색이 바뀐다(기본값 False)
 * wrapper로 넣고 싶은 내용을 Children으로 감싸서 사용
 */
function Card(props: { children?: ReactNode; isInteractive?: boolean; isSkeleton?: boolean; }) {
  const { children, isInteractive = false, isSkeleton } = props;
  return (
    <CardContainer isInteractive={isInteractive} isWhite={isSkeleton ?? false}>{children}</CardContainer>
  );
}

export default Card;
