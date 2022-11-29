import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

const data = {
    labels: ['수업 난이도', '유익함', '성적 만족도', '과제량', '재미/흥미', '강의 진행력'],
    datasets: [
        {
            label: 'Statistics',
            data: [2.4, 1.7, 2.5, 3.4, 1.8, 4.1],
            backgroundColor: 'rgba(255, 101, 101, 0.7)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 0,
            pointRadius: 0,
        },
    ],
};

const option = {
    scales: {
        animate:false
    }
}

export default function Hexagon() {
    return <Radar data={data}></Radar>
}