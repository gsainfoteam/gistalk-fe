import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import styled from "styled-components";
import { theme } from "@/style/theme";

import { HexLabels, HexagonData } from "../EvaluationPage.const";
import Card from "@components/Card";

interface HexagonProps {
  HexData: HexagonData;
}

const Wrap = styled.div`
  font-family: NSRegular;
  display: flex;
  justify-content: center;
  overflow-x: hidden;
  overflow-y: hidden;
`;

const EMPTY_DATA = {
  score: 0,
  subject: "",
};

export default function Hexagon({ HexData }: HexagonProps) {
  // empty_data로 채워진 길이 6의 배열을 반복문으로 구현한다
  const emptyData = Array.from({ length: 6 }, (_, i) => {
    return {
      ...EMPTY_DATA,
    };
  });

  const formattedData =
    HexData == null
      ? emptyData
      : HexLabels.map((i) => {
          const subject = i.subject;
          const isNegative = subject === "난이도" || subject === "과제량";
          const score = isNegative ? 6 - HexData[i.key] : HexData[i.key];

          //score을 소수점 두 번쨰 자리에서 반올림한다
          const adjustedScore = Math.round(score * 10) / 10;

          return {
            subject: `${subject} (${adjustedScore})`,
            A: adjustedScore,
            fullMark: 5.0,
          };
        });

  return (
    <>
      <Wrap>
        <RadarChart
          width={400}
          height={300}
          cx="50%"
          cy="50%"
          outerRadius="50%"
          data={formattedData}
          startAngle={180}
          endAngle={-180}
        >
          <PolarGrid polarRadius={[15, 29, 43, 59, 73]} />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: theme.colors.secondaryText, fontSize: 13 }}
          />
          <PolarRadiusAxis domain={[0, 5]} angle={90} />
          <Radar
            name="Standard"
            dataKey="A"
            fill={theme.colors.primary}
            fillOpacity={0.6}
          />
        </RadarChart>
      </Wrap>
    </>
  );
}
