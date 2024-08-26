import { opacity, theme } from "@/style/theme";
import { Radar } from "recharts";
import { isAllSelectedIdNull } from "../EvaluationPage.util";

export function hexagonRadar (
    selectedIndex: number, 
    idIndex: number, 
    selectedId: (number | null)[]) {
    return (
        <Radar
        key={selectedIndex}
        name="Standard"
        dataKey={`score${idIndex}`}
        fill={
        isAllSelectedIdNull(selectedId)
            ? theme.colors.primary
            : theme.RadarColor(opacity.true)[selectedIndex]
        }
        fillOpacity={
        isAllSelectedIdNull(selectedId)
            ? opacity.true : opacity.none
        }
        />
    )
}