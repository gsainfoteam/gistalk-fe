import styled from "styled-components";
import { theme } from "@/style/theme";
import { EvaluationToText } from "@/constants/EvaluationToText";

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

type SubjectScore = {
  subject: string;
  score: number;
};

interface HexagonData {
  id: number;
  lecture_id: number;
  people: number;
  diff_aver: number;
  stren_aver: number;
  help_aver: number;
  inter_aver: number;
  lots_aver: number;
  sati_aver: number;
  [key: string]: number; // Add index signature
}

interface SummaryProps {
  evaluationData: HexagonData;
}

const EVALUATION_TEXT = [
  "수업 난이도",
  "과제량",
  "유익함",
  "재미/흥미",
  "성적 만족도",
  "강의력",
];

function sortScoresBySubject(scores: HexagonData): number[] {
  const subjectsOrder = [
    "diff_aver",
    "lots_aver",
    "help_aver",
    "inter_aver",
    "sati_aver",
    "stren_aver",
  ];

  const sortedScores = subjectsOrder.map((subject) => {
    const subjectScore = scores[subject];
    return subjectScore;
  });

  return sortedScores;
}

const LOW = 0;
const MIDDLE = 1;
const height = 2;

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
      return height;
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
