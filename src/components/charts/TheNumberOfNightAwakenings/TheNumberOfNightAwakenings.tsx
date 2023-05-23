import React from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import './TheNumberOfNightAwakenings.css';


const data: Array<{
  date: string,
  nightAwakeningsCount: number
}> = [
  {
    date: '11.06.2022',
    nightAwakeningsCount: 6,
  },
  {
    date: '12.06.2022',
    nightAwakeningsCount: 4,
  },
  {
    date: '13.06.2022',
    nightAwakeningsCount: 7,
  },
  {
    date: '14.06.2022',
    nightAwakeningsCount: 10,
  },
  {
    date: '15.06.2022',
    nightAwakeningsCount: 0,
  },
  {
    date: 'средняя',
    nightAwakeningsCount: (0 + 6 + 4 + 7 + 10) / 5,
  },
]

/**
 * количество ночных пробуждений 
 * (за 1 день, средняя продолжительность за неделю)
 * @returns 
 */
const TheNumberOfNightAwakenings: React.FC = () => {
  return(
    <>
      <h3>количество ночных пробуждений</h3>
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
        <YAxis dataKey='nightAwakeningsCount'/>
        <Tooltip />
        <Legend />
        <Bar name='количество ночных пробуждений' dataKey="nightAwakeningsCount" fill="#4F81BD" />
      </BarChart>
    </>
  )
}

export default TheNumberOfNightAwakenings;