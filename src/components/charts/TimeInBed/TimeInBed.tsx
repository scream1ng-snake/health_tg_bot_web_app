import React from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';
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
    {
      date: 'средняя',
      hoursInBed: (0 + 6 + 4 + 7 + 10) / 5,
    },
  ]

/**
 * соблюдение времени нахождения в постели 
 * (авто расчет разницы времени отхода ко сну и времени подъема за 1 день, 
 * средняя продолжительность за неделю) в часах
 * @returns 
 */
const TimeInBed: React.FC = () => {
  const layout = {
    width: '80%',
    height: 200
  }
  return (
    <div className='responsiveChart'>
      <h3>Время нахождения в постели</h3>
      <ResponsiveContainer {...layout}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis dataKey='hoursInBed' />
          <Tooltip />
          <Legend />
          <Bar name='Время нахождения в постели' dataKey="hoursInBed" fill="#4F81BD" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TimeInBed;