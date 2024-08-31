import { showSkeleton } from "@/pages/skeletonComponents/Keyframes";
import styled from "styled-components";

const LectureReview = styled.p<{isSkeleton?: boolean;}>`
  font-size: 14px;
  padding: 0.5em 0 0 0;
  display: flex;
  word-break: break-all;

  ${(props) => showSkeleton(props.isSkeleton ?? false)};
  ${(props) => props.isSkeleton && 
    `
    margin-top: 6px;
    height: 16px;`};
`;

export default LectureReview;
