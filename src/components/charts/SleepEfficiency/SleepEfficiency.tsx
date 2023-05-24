import React from 'react';
import './SleepEfficiency.css';
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
    sleepEfficiency: 62,
  },
  {
    date: '06.05.2023',
    sleepEfficiency: 72,
  },
  {
    date: '07.05.2023',
    sleepEfficiency: 93,
  },
  {
    date: '08.05.2023',
    sleepEfficiency: 89,
  },
  {
    date: '09.05.2023',
    sleepEfficiency: 97,
  },
  {
    date: '10.05.2023',
    sleepEfficiency: 98,
  },
];

/**
 * оценка эффективности сна = длительность сна (в минутах) / 
 * время нахождения в постели (в минутах) * 100%. 
 * Отображать норму более 90%
 * @returns 
 */
const SleepEfficiency: React.FC = () => {
  return(
    <>
      <h3>эффективность сна</h3>
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
          name='Эффективность сна'
          dataKey="sleepEfficiency" 
          stroke="#4A7EBB"
        />
      </LineChart>
    </>
  )
}

export default SleepEfficiency;