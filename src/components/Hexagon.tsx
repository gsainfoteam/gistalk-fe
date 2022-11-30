import {Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer} from 'recharts';
import styled from "styled-components";
import {theme} from "../style/theme";

interface IProps {
    subject: string;
    A: number;
    fullMark: number;
}

const data: IProps[] = [
    {
        subject: '수업 난이도',
        A: 1.0,
        fullMark: 5.0,
    },
    {
        subject: '유익함',
        A: 2.0,
        fullMark: 5.0,
    },
    {
        subject: '성적 만족도',
        A: 3.5,
        fullMark: 5.0,
    },
    {
        subject: '과제량',
        A: 4.0,
        fullMark: 5.0,
    },
    {
        subject: '재미/흥미',
        A: 5.0,
        fullMark: 5.0,
    },
    {
        subject: '강의력',
        A: 2.5,
        fullMark: 5.0,
    },
];

const formattedData = data.map(i => {
    return {
        subject: i.subject + ' (' + i.A.toString() + ')',
        A: i.A,
        fullMark: i.fullMark
    }
})

const Wrap = styled.div`
  font-family: NSRegular;
  width: 100vw;
  display: flex;
  justify-content: center;
`

export default function Hexagon() {
    return (
        <Wrap>
            <RadarChart width={360} height={350} cx="50%" cy="50%" outerRadius="50%" data={formattedData}>
                <PolarGrid polarRadius={[28.34, 56.67, 85]}/>
                <PolarAngleAxis dataKey="subject" tick={{fill: theme.colors.secondaryText, fontSize: 14}}/>
                <PolarRadiusAxis domain={[0, 5]}/>
                <Radar name="Standard" dataKey="A" fill={theme.colors.primary} fillOpacity={0.8}/>
            </RadarChart>
        </Wrap>
    );
}