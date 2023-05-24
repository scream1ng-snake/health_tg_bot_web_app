import React from 'react';
import './SleepQuality.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";


const data = [
  {
    date: '05.05.2023',
    sleepQuantiti: 2,
  },
  {
    date: '06.05.2023',
    sleepQuantiti: 2,
  },
  {
    date: '07.05.2023',
    sleepQuantiti: 4,
  },
  {
    date: '08.05.2023',
    sleepQuantiti: 5,
  },
];

/**
 * оценка качества сна 
 * (за 1 день, средняя продолжительность за неделю)
 * @returns 
 */
const SleepQuality: React.FC = () => {
  return(
    <>
      <h3>оценка качества сна</h3>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 10
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" height={60} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line 
          strokeWidth={2}
          name='Качество сна'
          dataKey="sleepQuantiti" 
          stroke="#4A7EBB"
        />
      </LineChart>
    </>
  )
}

export default SleepQuality;