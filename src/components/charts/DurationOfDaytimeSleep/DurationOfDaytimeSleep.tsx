import React from 'react';
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Legend, 
  Tooltip, 
  XAxis, 
  YAxis, 
  ResponsiveContainer
} from 'recharts';
import './DurationOfDaytimeSleep.css';

const data: Array<{
  date: string,
  durationDaySleep: number
}> = [
  {
    date: '11.06.2022',
    durationDaySleep: 60,
  },
  {
    date: '12.06.2022',
    durationDaySleep: 40,
  },
  {
    date: '13.06.2022',
    durationDaySleep: 70,
  },
  {
    date: '14.06.2022',
    durationDaySleep: 100,
  },
  {
    date: '15.06.2022',
    durationDaySleep: 30,
  },
  {
    date: 'средняя',
    durationDaySleep: (60 + 40 + 70 + 100 + 30) / 5,
  },
]

/**
 * длительность дневного сна 
 * @returns 
 */
const DurationOfDaytimeSleep: React.FC = () => {
  const layout = { 
    width: '80%',
    height: 200
  }
  return(
    <div className='responsiveChart'>
      <h3 className='subtitle'>Длительность дневного сна</h3>
      <ResponsiveContainer {...layout}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis dataKey='durationDaySleep'/>
          <Tooltip />
          <Legend />
          <Bar name='Длительность дневного сна' dataKey="durationDaySleep" fill="#4F81BD" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
};

export default DurationOfDaytimeSleep;