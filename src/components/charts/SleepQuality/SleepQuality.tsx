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
  ResponsiveContainer,
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
  const layout = {
    width: '80%',
    height: 200
  }
  return (
    <div className='responsiveChart'>
      <h3>оценка качества сна</h3>
      <ResponsiveContainer {...layout}>
        <LineChart data={data}>
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
      </ResponsiveContainer>
    </div>
  )
}

export default SleepQuality;