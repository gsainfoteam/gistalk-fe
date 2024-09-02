import { css, keyframes } from "styled-components";

/**
 * 배경색 바뀌는 keyframes
 */
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

export const skeletonCardGradient = keyframes`
  0% {
    background-color: rgba(247,249,251,0.6);
  }
  50% {
    background-color: rgba(247,249,251,0.8);
  }
  100% {
    background-color: rgba(247,249,251,0.6);
  }
`;

/**
 * skeleton의 배경색 animation
 * 
 * @returns -animation 반환
 */
export const showSkeleton = () => {
  return css`animation: ${skeletonGradient} 1.5s infinite ease-in-out`
};