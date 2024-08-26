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
import { hexagonRadar } from "./HexagonRadar";
import { isAllSelectedIdNull } from "../EvaluationPage.util";

interface HexagonProps {
  HexData: HexagonData[];
  selectedId: (number | null)[];
}

const Wrap = styled.div`
  font-family: NSRegular;
  display: flex;
  justify-content: center;
  overflow-x: hidden;
  overflow-y: hidden;
`;

export default function Hexagon({ HexData, selectedId }: HexagonProps) {
  
  const formattedData = HexLabels.map((i) => {
    const subject = i.subject;
    const isNegative = subject === "난이도" || subject === "과제량";
    const adjustedScore = HexData.map((Hex) => {
      const score = Hex[i.key] && isNegative ? 6 - Hex[i.key] : Hex[i.key];
      return Math.round(score * 10) / 10;
    });

    let dataKey: any = {
      subject: `${subject}`,
      fullMark: 5.0,
    };
    HexData.map(
      (Hex, index) => (dataKey[`score${index}`] = adjustedScore[index])
    );

    return dataKey;
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
          {isAllSelectedIdNull(selectedId) 
            ? hexagonRadar(0, 0, selectedId)
            : selectedId.filter((id) => (id !== null)).map((id, index) => 
              hexagonRadar(selectedId.indexOf(id), index, selectedId)
          )}
        </RadarChart>
      </Wrap>
    </>
  );
}
