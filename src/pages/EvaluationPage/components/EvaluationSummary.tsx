import styled from "styled-components";
import { opacity, theme } from "@/style/theme";
import { EvaluationToText } from "@/constants/EvaluationToText";
import {
  EVALUATION_TEXT,
  evaluationData,
  HexagonData,
  SUBJECT_SHOW_ORDER,
} from "../EvaluationPage.const";
import { indexOfExistData, isAllSelectedIdNull } from "../EvaluationPage.util";
import { SkeletonDiv } from "@/pages/skeletonComponents/Skeleton.styled";

const ConcreteInfoGrid = styled.div`
  margin: 10px auto 0 auto;
  &:first-child {
    margin-top: 0;
  }
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(1, 25px);
`;

/** 구체적인 수치 보기를 클릭했을 보여주는 info */
const ConcreteInfo = styled(theme.universalComponent.DivTextContainer)<{
  colorP?: string;
}>`
  font-family: NSMedium;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;

  div:nth-child(1) {
    margin-left: 10px;
  }

  div:nth-child(2) {
    font-family: NSRegular;

    span {
      color: ${(props) => props.colorP};
    }

    margin-right: 10px;
  }
`;

interface SummaryProps {
  selectedEvaluation: evaluationData[] | undefined;
  selectedId: (number | null)[];
  isLoading: boolean;
}

function sortScoresBySubject(scores: any): number[] {
  const sortedScores = SUBJECT_SHOW_ORDER.map((subject) => {
    const subjectScore = scores[subject];
    return subjectScore;
  });

  return sortedScores;
}

const LOW = 0;
const MIDDLE = 1;
const HIGH = 2;

export default function EvaluationSummary({
  selectedEvaluation,
  selectedId,
  isLoading,
}: SummaryProps) {
  let result: JSX.Element[] = [];

  function showResult(order: number, existIndex: number) { 
    //existIndex는 교수자 선택 시 교수자의 index 값을, 그 외에는 리뷰가 있는 첫 번째 교수자의 index를 갖는다. 
    if (!selectedEvaluation) {
      const skeletonNumber = new Array(6).fill(null); //skeleton을 위한 6개의 배열

      return (
      <ConcreteInfoGrid>
      {skeletonNumber.map((skeleton, index) => 
        <ConcreteInfo key={index} color={theme.colors.secondaryText} fontSize={15}>
          <SkeletonDiv widthSize="50px" heightSize="18px"/>
          {index === 4 || index === 5 
            ? <SkeletonDiv widthSize="80px" heightSize="18px"/> 
            : <SkeletonDiv widthSize="40px" heightSize="18px"/>}
        </ConcreteInfo>)}
      </ConcreteInfoGrid>
      )
    }
    else selectedEvaluation.map((summary, index) => {
      const data = sortScoresBySubject(summary);

      const indexData = data.map((item: number) => {
        if (item < 2.5 && item >= 0) {
          return LOW;
        } else if (item >= 2.5 && item <= 3.5) {
          return MIDDLE;
        } else {
          return HIGH;
        }
      });

      result[index] = (
        <ConcreteInfoGrid key={index}>
          {indexData.map((item: number, index: number) => (
            <ConcreteInfo
              key={index}
              color={theme.colors.secondaryText}
              colorP={
                isAllSelectedIdNull(selectedId)
                  ? theme.colors.primary
                  : theme.RadarColor(opacity.none)[order]
              }
              fontSize={15}
            >
              <div>{EVALUATION_TEXT[index]}</div>
              <div>
                {data[index] === null ? (
                  <span> -</span>
                ) : (
                  <span>{EvaluationToText[index][item]}</span>
                )}
              </div>
            </ConcreteInfo>
          ))}
        </ConcreteInfoGrid>
      );
    });

    return result[existIndex];
  }

  return <>{isAllSelectedIdNull(selectedId) 
    ? selectedEvaluation ? showResult(0, indexOfExistData(selectedEvaluation)) : showResult(0,0)
    : selectedId.filter((id) => id !== null).map((id, index) => 
        showResult(selectedId.indexOf(id), index))}</>;
}
