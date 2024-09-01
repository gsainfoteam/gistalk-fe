import Card from "@components/Card";
import styled from "styled-components";
import { skeletonGradient } from "./Keyframes";

const UpComponentWrap = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  width: 20%;
  margin-bottom: 6px;

  animation: ${skeletonGradient} 1.5s infinite ease-in-out;
`;

const SubTitle = styled.div`
  width: 150px;
  height: 20px;
  margin-bottom: 6px;

  animation: ${skeletonGradient} 1.5s infinite ease-in-out;
`;

const Recommend = styled.div`
  width: 15%;
  margin-bottom: 6px;

  animation: ${skeletonGradient} 1.5s infinite ease-in-out;
`;

const Content = styled.div`
  margin-top: 6px;
  margin-bottom: 6px;

  animation: ${skeletonGradient} 1.5s infinite ease-in-out;
`;

export function MainPageSkeleton(isLoading: boolean) {
  const skeletonNumber = new Array(4).fill(null);
  return (
    skeletonNumber.map((skeleton, index) =>
        <Card key={index} isSkeleton={isLoading}>
          <UpComponentWrap>
            <Title>
              &nbsp;
            </Title>
            &ensp;
            <SubTitle />
          </UpComponentWrap>
            <Recommend>
              &nbsp;
            </Recommend>
          <Content>&nbsp;</Content>
        </Card> 
      )
  )
}