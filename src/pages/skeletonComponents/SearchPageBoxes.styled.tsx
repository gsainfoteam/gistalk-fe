import styled from "styled-components";
import { showSkeleton } from "./Keyframes";

export const SkeletonDiv = styled.div<{ isSkeleton: boolean }>`
  ${(props) => showSkeleton(props.isSkeleton)};
`;

export const ProfCodeBox = styled.p<{ isSkeleton: boolean }>`
  ${(props) => showSkeleton(props.isSkeleton)};
  ${(props) => props.isSkeleton && "width: 80%; margin-top: 3px;"};
`;

export const IconWrap = styled.div<{ isSkeleton: boolean; }>`
  border-radius: 20px;
  ${(props) => showSkeleton(props.isSkeleton)};
`;