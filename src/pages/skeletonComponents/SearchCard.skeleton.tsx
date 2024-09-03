import styled from "styled-components";
import { skeletonGradient } from "./Keyframes";

const WholeWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
`;

const ContentWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const DepartmentCircle = styled.div`
  width: 40px;
  height: 38px;
  border-radius: 20px;
  margin-bottom: 6px;

  animation: ${skeletonGradient} 1.5s infinite ease-in-out;
`;

const Title = styled.div`
  width: 85%;
  height: 25px;
  margin-bottom: 6px;

  animation: ${skeletonGradient} 1.5s infinite ease-in-out;
`;

const Subtitle = styled.div`
  width: 65%;
  height: 25px;
  margin-bottom: 6px;

  animation: ${skeletonGradient} 1.5s infinite ease-in-out;
`;

export const SearchCardSkeleton = (
  <WholeWrap>
    <DepartmentCircle />
    &ensp;
    <ContentWrap>
      <Title />
      <Subtitle />
    </ContentWrap>
  </WholeWrap>
);
