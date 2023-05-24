import React from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import './TheTotalDurationOfNightAwakenings.css';


const data: Array<{
  date: string,
  nightAwakeningsDuration: number
}> = [
  {
    date: '11.06.2022',
    nightAwakeningsDuration: 50,
  },
  {
    date: '12.06.2022',
    nightAwakeningsDuration: 30,
  },
  {
    date: '13.06.2022',
    nightAwakeningsDuration: 40,
  },
  {
    date: '14.06.2022',
    nightAwakeningsDuration: 30,
  },
  {
    date: '15.06.2022',
    nightAwakeningsDuration: 20,
  },
  {
    date: '16.06.2022',
    nightAwakeningsDuration: 5,
  },
  {
    date: '17.06.2022',
    nightAwakeningsDuration: 0,
  },
  {
    date: 'средняя',
    nightAwakeningsDuration: (50 + 30 + 40 + 30 + 20 +  5 +  0) / 7,
  },
]

/**
 * суммарная длительность ночных пробуждений за ночь, 
 * среднее значение за неделю 
 * (за 1 день, средняя продолжительность за неделю) в минутах
 * @returns 
 */
const TheTotalDurationOfNightAwakenings: React.FC = () => {
  return(
    <>
      <h3>суммарная длительность ночных пробуждений за ночь</h3>
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
        <YAxis dataKey='nightAwakeningsDuration'/>
        <Tooltip />
        <Legend />
        <Bar name='суммарная длительность пробуждений за ночь' dataKey="nightAwakeningsDuration" fill="#4F81BD" />
      </BarChart>
    </>
  )
}

export default TheTotalDurationOfNightAwakenings;