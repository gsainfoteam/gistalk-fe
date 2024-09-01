import styled from "styled-components";
import { skeletonGradient } from "./Keyframes";

const Title = styled.div`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  margin-bottom: 6px;

  animation: ${skeletonGradient} 1.5s infinite ease-in-out;
`;

const Content = styled.div`
  width: 100%;
  height: 120px;
  border-radius: 10px;
  margin-top: 6px;
  margin-bottom: 6px;

  animation: ${skeletonGradient} 1.5s infinite ease-in-out;
`;

export function ProfilePageSkeleton() {
  return (
    <>
        <Title />
        <Content />
    </>
  )
}