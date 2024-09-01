import styled from "styled-components";
import { skeletonGradient } from "./Keyframes";

const QuestionWrap = styled.div<{index: number}>`
  margin-bottom: ${(props) => props.index === 1 ? "30px" : "5px"};
`;

const Title = styled.div`
  width: 80px;
  height: 20px;
  margin-bottom: 6px;

  animation: ${skeletonGradient} 1.5s infinite ease-in-out;
`;

const Question = styled.div`
  height: 30px;
  margin-bottom: 6px;

  animation: ${skeletonGradient} 1.5s infinite ease-in-out;
`;

const SelectionWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Selection = styled.div`
  width: 400px;
  height: 50px;
  margin-bottom: 6px;

  animation: ${skeletonGradient} 1.5s infinite ease-in-out;
`;

const RecommendSelecWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const RecommendSelection = styled.div`
  width: 100px;
  height: 25px;
  margin-bottom: 6px;

  animation: ${skeletonGradient} 1.5s infinite ease-in-out;
`;

const ReviewTitle = styled.div`
  width: 80px;
  height: 20px;
  margin-top: 40px;
  margin-bottom: 6px;

  animation: ${skeletonGradient} 1.5s infinite ease-in-out;
`;

const ReviewSubTitle = styled.div`
  width: 250px;
  height: 30px;
  margin-bottom: 6px;

  animation: ${skeletonGradient} 1.5s infinite ease-in-out;
`;

const WriteReview = styled.div`
  width: 100%;
  height: 200px;
  margin-bottom: 6px;

  animation: ${skeletonGradient} 1.5s infinite ease-in-out;
`;

const Submit = styled.div`
  width: 100%;
  height: 50px;
  margin-top: 40px;
  margin-bottom: 6px;

  animation: ${skeletonGradient} 1.5s infinite ease-in-out;
`;

export function WritePageSkeleton() {
  const skeletonNumber = new Array(8).fill(null); //skeleton component를 위한 8개의 null이 있는 배열
  return (
    <>{
    skeletonNumber.map((skeleton, index) => 
        <QuestionWrap key={index} index={index}>
            <br />
            <Title />
            <Question>
                &nbsp;
            </Question>
            {index > 1 && 
            <SelectionWrap>
                <Selection />
            </SelectionWrap>}
        </QuestionWrap>)
        }
        <Title />
        <RecommendSelecWrap>
            <RecommendSelection />
            <RecommendSelection />
            <RecommendSelection />
        </RecommendSelecWrap>
        <ReviewTitle />
        <ReviewSubTitle />
        <WriteReview />
        <Submit />
    </>
  )
}