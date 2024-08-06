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

interface HexagonProps {
  HexData: HexagonData[];
  averageData: HexagonData[];
}

const Wrap = styled.div`
  font-family: NSRegular;
  display: flex;
  justify-content: center;
  overflow-x: hidden;
  overflow-y: hidden;
`;

export default function Hexagon({ HexData, averageData }: HexagonProps) {
  let HexCount = 0;

  const formattedData =
    HexLabels.map((i, index) => {
      let adjustedScore: number[] = [];
      const subject = i.subject;
      const isNegative = subject === "난이도" || subject === "과제량";
      let adjustedScoreCount = 0;
      HexData.map((Hex) => {
        const score =
        Hex[i.key] && isNegative ? 6 - Hex[i.key] : Hex[i.key]
        //score을 소수점 두 번쨰 자리에서 반올림하여 배열에 불러온 데이터 만큼 저장한다. 
        adjustedScore[adjustedScoreCount] = Math.round(score * 10) / 10;
        adjustedScoreCount++;
      });

      let dataKey: any = { 
        subject: `${subject} (${adjustedScore})`,
        fullMark: 5.0,
      };
      for (let k = 0; k < HexData.length + 1; k++) { //return할 객체값을 동적 변수로 저장한다
        dataKey[`score${k+1}`] = adjustedScore[k];
      }

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
          {HexData.map((Hex, index) => {
            if (Hex != null) {
              HexCount += 1;
              return (
                <Radar
                key={HexCount}  
                name="Standard"
                dataKey={`score${HexCount}`}
                fill={averageData === HexData ? "#FF6565" : Object.values(theme.PrimaryColor)[index]}
                fillOpacity={averageData === HexData ? 0.6 : 1}
                />
            );
          }
          })
          }
        </RadarChart>
      </Wrap>
    </>
  );
}
