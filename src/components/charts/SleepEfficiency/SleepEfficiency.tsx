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
  ResponsiveContainer,
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
  const layout = {
    width: '80%',
    height: 200
  }
  return (
    <div className='responsiveChart'>
      <h3>эффективность сна</h3>
      <ResponsiveContainer {...layout}>
        <LineChart data={data}>
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
      </ResponsiveContainer>
    </div>
  )
}

export default SleepEfficiency;