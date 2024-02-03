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

interface IProps {
  HexData: IHexData[];
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

export default function Hexagon({ HexData }: IProps) {
  const formattedData = HexData.map((i) => {
    return {
      subject: i.subject + " (" + i.score.toString() + ")",
      A: i.score,
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
