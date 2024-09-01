import styled from "styled-components";
import { SkeletonDiv } from "./Skeleton.styled";
import { skeletonGradient } from "./Keyframes";

const InfoWrap = styled.div`
  display: flex;
`;

const RecommendSkeleton = styled.div`
  width: 45px;
  height: 20px;
  margin-bottom: 6px;

  animation: ${skeletonGradient} 1.5s infinite ease-in-out;
`;

const ProfSkeleton = styled.div`
  width: 35px;
  height: 20px;
  margin-bottom: 6px;

  animation: ${skeletonGradient} 1.5s infinite ease-in-out;
`;

const SemesterSkeleton = styled.div`
  width: 85px;
  height: 20px;
  margin-bottom: 6px;

  animation: ${skeletonGradient} 1.5s infinite ease-in-out;
`;

export function ReplySkeleton() {
    return (
        <>
          <InfoWrap>
            <RecommendSkeleton />&ensp;
            <ProfSkeleton />&ensp;
            <SemesterSkeleton />
          </InfoWrap>
          <SkeletonDiv>
            &nbsp;<br />&nbsp;
          </SkeletonDiv>
        </>
    )
}