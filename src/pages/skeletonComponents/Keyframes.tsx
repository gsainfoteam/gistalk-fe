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

/**
 * skeleton의 배경색 animation
 * 
 * @param isSkeleton -loading이면 true 반환
 * @returns -animation 반환
 */
export const showSkeleton = ( isSkeleton: boolean ) => {
  if (isSkeleton)
    return css`animation: ${skeletonGradient} 1.5s infinite ease-in-out`
};

const skeletonHexGradient = (isUpComponent: boolean) => {
  if (isUpComponent)
    return keyframes`
    0% {
      border-color: transparent transparent rgba(165, 165, 165, 0.1) transparent;
    }
    50% {
      border-color: transparent transparent rgba(165, 165, 165, 0.3) transparent;
    }
    100% {
      border-color: transparent transparent rgba(165, 165, 165, 0.1) transparent;
    }`
  else 
    return keyframes`
    0% {
      border-color: rgba(165, 165, 165, 0.1) transparent transparent transparent;
    }
    50% {
      border-color: rgba(165, 165, 165, 0.3) transparent transparent transparent;
    }
    100% {
      border-color: rgba(165, 165, 165, 0.1) transparent transparent transparent;
    }`
}

/**
 * Hexagon의 skeleton animation
 * 
 * @param isSkeleton -loading이면 true 반환
 * @param isUpComponent -Hexagon 윗부분이면 true 반환
 * @returns 
 */
export const showHexSkeleton = ( isSkeleton: boolean, isUpComponent: boolean ) => {
  if (isSkeleton)
    return css`animation: ${skeletonHexGradient(isUpComponent)} 1.5s infinite ease-in-out`
}