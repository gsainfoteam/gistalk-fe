import styled from "styled-components";
import { showHexSkeleton, showSkeleton, skeletonGradient } from "./Keyframes";

export const SkeletonDiv = styled.div<{
  widthSize?: string; 
  heightSize?: string
  }>`
  ${(props) => `width: ${props.widthSize}; height: ${props.heightSize};`};
  margin-bottom: 6px;

  animation: ${skeletonGradient} 1.5s infinite ease-in-out;
`;

export const ProfCodeBox = styled.p<{ isSkeleton: boolean }>`
  ${(props) => showSkeleton(props.isSkeleton)};
  ${(props) => props.isSkeleton && "width: 80%; margin-top: 3px;"};
`;

export const IconWrap = styled.div<{ isSkeleton: boolean; }>`
  border-radius: 20px;
  ${(props) => showSkeleton(props.isSkeleton)};
`;

export const SkeletonHexagon = styled.div<{isSkeleton: boolean;}>`
  position: relative;
  width: 130px;
  height: 75px;
  transform: rotate(90deg);

  &::before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    top: -40px;
    border-style: solid;
    border-width: 0 65px 40px 65px;
    ${(props) => showHexSkeleton(props.isSkeleton, true)};
  }
  
  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    top: 75px;
    border-style: solid;
    border-width: 40px 65px 0 65px;
    ${(props) => showHexSkeleton(props.isSkeleton, false)};
  }

  ${(props) => showSkeleton(props.isSkeleton)};
`;

export const skeletonReview = new Array(2).fill(null); //skeleton을 위한 6개의 배열