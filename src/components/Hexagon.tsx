import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";
import { theme } from "../style/theme";
import { IHexData } from "../Interfaces/interfaces";

interface IProps {
  HexData: IHexData[];
}

const Wrap = styled.div`
  font-family: NSRegular;
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const Coloring = styled.span<{ color: string }>`
  color: ${(props) => props.color};
`;

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
          fillOpacity={0.8}
        />
      </RadarChart>
    </Wrap>
  );
}
