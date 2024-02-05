import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import styled from "styled-components";
import { theme } from "@/style/theme";
import { IHexData } from "@/Interfaces/interfaces";

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

const labels = [
  { key: "interest", label: "재미/흥미" },
  { key: "lots", label: "과제량" },
  { key: "difficulty", label: "난이도" },
  { key: "helpful", label: "유익함" },
  { key: "strength", label: "강의력" },
  { key: "satisfy", label: "만족도" },
];

const HexLabels = [
  { key: "diff_aver", subject: "난이도" },
  { key: "stren_aver", subject: "강의력" },
  { key: "help_aver", subject: "유익함" },
  { key: "inter_aver", subject: "흥미" },
  { key: "lots_aver", subject: "과제량" },
  { key: "sati_aver", subject: "만족도" },
];
export default function Hexagon({ HexData }: HexagonProps) {
  const emptyData = [
    {
      score: 0,
      subject: "평가 데이터가 없습니다.",
    },
  ];

  const formattedData =
    HexData == null
      ? emptyData
      : HexLabels.map((i) => {
          const score = HexData[i.key];
          const subject = i.subject;

          return {
            subject: `${subject} (${score})`,
            A: score,
            fullMark: 5.0,
          };
        });

  return (
    <Wrap>
      <RadarChart
        width={400}
        height={300}
        cx="50%"
        cy="50%"
        outerRadius="50%"
        data={formattedData}
      >
        <PolarGrid polarRadius={[23.34, 48.67, 73]} />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: theme.colors.secondaryText, fontSize: 13 }}
        />
        <PolarRadiusAxis domain={[0, 5]} />
        <Radar
          name="Standard"
          dataKey="A"
          fill={theme.colors.primary}
          fillOpacity={0.6}
        />
      </RadarChart>
    </Wrap>
  );
}
