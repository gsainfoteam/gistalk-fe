import styled from "styled-components";
import { showHexSkeleton, showSkeleton } from "./Keyframes";

const SkeletonHexagon = styled.div`
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
    ${showHexSkeleton(true)};
  }
  
  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    top: 75px;
    border-style: solid;
    border-width: 40px 65px 0 65px;
    ${showHexSkeleton(false)};
  }

  ${showSkeleton()};
`;

export const HexagonSkeleton = <SkeletonHexagon />;