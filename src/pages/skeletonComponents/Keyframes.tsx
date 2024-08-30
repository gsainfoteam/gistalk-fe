import { css, keyframes } from "styled-components";

export const skeletonGradient = keyframes`
  0% {
    background-color: rgba(165, 165, 165, 0.1);
  }
  50% {
    background-color: rgba(165, 165, 165, 0.3);
  }
  100% {
    background-color: rgba(165, 165, 165, 0.1);
  }
`;

export const showSkeleton = ( isSkeleton: boolean ) => {
  if (isSkeleton)
    return css`animation: ${skeletonGradient} 1.5s infinite ease-in-out`
};