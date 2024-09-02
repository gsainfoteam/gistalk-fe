import styled from "styled-components";
import { skeletonGradient } from "./Keyframes";

export const SkeletonDiv = styled.div<{
  widthSize?: string; 
  heightSize?: string;
  }>`
  ${(props) => `width: ${props.widthSize}; height: ${props.heightSize};`};
  margin-bottom: 6px;

  animation: ${skeletonGradient} 1.5s infinite ease-in-out;
`;

export const skeletonReview = new Array(2).fill(null); //Reply의 skeleton을 위한 2개의 배열