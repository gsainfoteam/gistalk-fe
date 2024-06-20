import styled from "styled-components";
import { theme } from "@/style/theme";
import { EvaluationToText } from "@/constants/EvaluationToText";
import {
  EVALUATION_TEXT,
  HexagonData,
  SUBJECT_SHOW_ORDER,
} from "../EvaluationPage.const";

const ConcreteInfoGrid = styled.div`
  margin: 10px auto 0 auto;
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
  evaluationData: HexagonData;
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

export default function EvaluationSummary({ evaluationData }: SummaryProps) {
  if (evaluationData == null) {
    return null;
  }

  const data = sortScoresBySubject(evaluationData);

  const indexData = data.map((item: number) => {
    if (item <= 2) {
      return LOW;
    } else if (item == 3) {
      return MIDDLE;
    } else {
      return HIGH;
    }
  });

  return (
    <ConcreteInfoGrid>
      {indexData.map((item: number, index: number) => (
        <ConcreteInfo
          key={index}
          color={theme.colors.secondaryText}
          colorP={theme.colors.primary}
          fontSize={15}
        >
          <div>{EVALUATION_TEXT[index]}</div>
          <div>
            <span>{EvaluationToText[index][item]}</span>
          </div>
        </ConcreteInfo>
      ))}
    </ConcreteInfoGrid>
  );
}
