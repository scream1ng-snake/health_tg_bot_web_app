import React from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import './TimeSpentInBedAfterWakingUp.css';


const data: Array<{
  date: string,
  afterWakingUpMinutes: number
}> = [
  {
    date: '11.06.2022',
    afterWakingUpMinutes: 50,
  },
  {
    date: '12.06.2022',
    afterWakingUpMinutes: 30,
  },
  {
    date: '13.06.2022',
    afterWakingUpMinutes: 40,
  },
  {
    date: '14.06.2022',
    afterWakingUpMinutes: 30,
  },
  {
    date: '15.06.2022',
    afterWakingUpMinutes: 20,
  },
  {
    date: '16.06.2022',
    afterWakingUpMinutes: 5,
  },
  {
    date: '17.06.2022',
    afterWakingUpMinutes: 0,
  },
  {
    date: 'средняя',
    afterWakingUpMinutes: (50 + 30 + 40 + 30 + 20 +  5 +  0) / 7,
  },
]

/**
 * время в постели от пробуждения до подъема 
 * (за 1 день, средняя продолжительность за неделю) в минутах
 * @returns 
 */
const TimeSpentInBedAfterWakingUp: React.FC = () => {
  return(
    <>
      <h3>Время нахождения в постели после пробуждения</h3>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis dataKey='afterWakingUpMinutes'/>
        <Tooltip />
        <Legend />
        <Bar name='Время нахождения в постели после пробуждения' dataKey="afterWakingUpMinutes" fill="#4F81BD" />
      </BarChart>
    </>
  )
}

export default TimeSpentInBedAfterWakingUp;