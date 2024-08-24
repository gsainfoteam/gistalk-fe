import styled from "styled-components";
import { theme } from "@/style/theme";
import { EvaluationToText } from "@/constants/EvaluationToText";
import {
  EVALUATION_TEXT,
  HexagonData,
  opacity,
  SUBJECT_SHOW_ORDER,
} from "../EvaluationPage.const";

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
  colorP: string;
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
  evaluationData: HexagonData[];
  averageData: HexagonData[];
  selectedId: (number | null)[];
}

function sortScoresBySubject(scores: HexagonData): number[] {
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
  evaluationData,
  averageData,
  selectedId,
}: SummaryProps) {
  let result: JSX.Element[] = [];

  function showResult(order: number, idIndex: number, reviewData: HexagonData[]) {
    reviewData.map((summary, index) => {
      if (reviewData == null) {
        return null;
      }

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
                selectedId.every((value) => value == null)
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

    return result[idIndex];
  }

  console.log();
  return <>{selectedId.every((value) => value === null) 
    ? showResult(
      0, 
      averageData.findIndex((data) => Object.values(data).every((content) => content !== null)), 
      averageData)
    : selectedId.filter((id) => id !== null).map((id, index) => 
        showResult(selectedId.indexOf(id), index, evaluationData))}</>;
}
