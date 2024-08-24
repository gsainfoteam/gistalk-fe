import { opacity, theme } from "@/style/theme";
import { Radar } from "recharts";

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
        selectedId.every((value) => value == null)
            ? theme.colors.primary
            : theme.RadarColor(opacity.true)[selectedIndex]
        }
        fillOpacity={
        selectedId.every((value) => value == null)
        ? opacity.true : opacity.none
        }
        />
    )
}