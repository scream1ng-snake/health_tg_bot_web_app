import React from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import './TimeInBed.css';


const data: Array<{
  date: string,
  hoursInBed: number
}> = [
  {
    date: '11.06.2022',
    hoursInBed: 6,
  },
  {
    date: '12.06.2022',
    hoursInBed: 4,
  },
  {
    date: '13.06.2022',
    hoursInBed: 7,
  },
  {
    date: '14.06.2022',
    hoursInBed: 10,
  },
  {
    date: '15.06.2022',
    hoursInBed: 0,
  },
]

/**
 * соблюдение времени нахождения в постели 
 * (авто расчет разницы времени отхода ко сну и времени подъема за 1 день, 
 * средняя продолжительность за неделю) в часах
 * @returns 
 */
const TimeInBed = () => {
  return(
    <>
      <h3>Время нахождения в постели</h3>
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
        <YAxis dataKey='hoursInBed'/>
        <Tooltip />
        <Legend />
        <Bar name='Время нахождения в постели' dataKey="hoursInBed" fill="#4F81BD" />
      </BarChart>
    </>
  )
}

export default TimeInBed;