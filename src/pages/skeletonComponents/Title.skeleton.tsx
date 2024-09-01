import styled from "styled-components";
import { skeletonGradient } from "./Keyframes";

const Title = styled.div`
  width: 70%;
  height: 30px;
  margin-bottom: 6px;

  animation: ${skeletonGradient} 1.5s infinite ease-in-out;
`;

const ProfWrap = styled.span`
  display: flex;
  justify-content: start;
  align-items: center;
`;

const Professor = styled.div`
  width: 40px;
  height: 18px;
  margin-right: 6px;
  margin-bottom: 6px;

  animation: ${skeletonGradient} 1.5s infinite ease-in-out;
`;

const ProfContent = styled.div`
  width: 80%;
  height: 25px;
  margin-bottom: 6px;

  animation: ${skeletonGradient} 1.5s infinite ease-in-out;
`;

export function TitleSkeleton() {
  return (
    <>
        <Title />
        <ProfWrap>
          <Professor />
          <ProfContent />
        </ProfWrap>
    </>
  )
}