import React, { FunctionComponent } from 'react';
import './DynamicsOfSleepDurationAndStayingInBed.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer
} from "recharts";


const data = [
  {
    date: '05.05.2023',
    timeInBedMinutes: 390,
    timeSleepingMinutes: 240
  },
  {
    date: '06.05.2023',
    timeInBedMinutes: 390,
    timeSleepingMinutes: 280
  },
  {
    date: '07.05.2023',
    timeInBedMinutes: 420,
    timeSleepingMinutes: 390
  },
  {
    date: '08.05.2023',
    timeInBedMinutes: 360,
    timeSleepingMinutes: 320
  },
  {
    date: '09.05.2023',
    timeInBedMinutes: 390,
    timeSleepingMinutes: 380
  },
  {
    date: '10.05.2023',
    timeInBedMinutes: 400,
    timeSleepingMinutes: 390
  },
];

/**
 * динамика длительности сна и времени, 
 * проведенного в постели (за каждый день)
 * в часах или в минутах в зависимости от удобства вычислений
 * @returns 
 */
const DynamicsOfSleepDurationAndStayingInBed: React.FC = () => {
  const layout = {
    width: '80%',
    height: 200
  }
  return (
    <div className='responsiveChart'>
      <h3>динамика длительности сна и времени, проведенного в постели</h3>
      <ResponsiveContainer {...layout}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" height={60} tick={<CustomizedAxisTick />} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            strokeWidth={2}
            name='Время в постели, мин.'
            dataKey="timeInBedMinutes"
            stroke="#BE4B48"
          >
            <LabelList content={<CustomizedLabel />} />
          </Line>
          <Line
            strokeWidth={2}
            name='Время сна, мин.'
            dataKey="timeSleepingMinutes"
            stroke="#4A7EBB"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default DynamicsOfSleepDurationAndStayingInBed;

const CustomizedLabel: FunctionComponent<any> = (props: any) => {
  const { x, y, stroke, value } = props;

  return (
    <text x={x} y={y} dy={-10} fill={stroke} fontSize={15} textAnchor="middle">
      {value}
    </text>
  );
};

const CustomizedAxisTick: FunctionComponent<any> = (props: any) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
      >
        {payload.value}
      </text>
    </g>
  );
};

