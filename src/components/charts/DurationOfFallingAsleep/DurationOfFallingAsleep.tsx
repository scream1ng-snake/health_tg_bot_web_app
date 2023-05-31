import React from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';
import './DurationOfFallingAsleep.css';


const data: Array<{
  date: string,
  fallingSleepMinutes: number
}> = [
    {
      date: '11.06.2022',
      fallingSleepMinutes: 60,
    },
    {
      date: '12.06.2022',
      fallingSleepMinutes: 40,
    },
    {
      date: '13.06.2022',
      fallingSleepMinutes: 70,
    },
    {
      date: '14.06.2022',
      fallingSleepMinutes: 100,
    },
    {
      date: '15.06.2022',
      fallingSleepMinutes: 0,
    },
    {
      date: 'средняя',
      fallingSleepMinutes: (0 + 60 + 40 + 70 + 100) / 5,
    },
  ]

/**
 * время, потраченное на засыпание в минутах за 1 день, 
 * средняя продолжительность за неделю 
 * (отображать норму - менее 30 минут)
 * @returns 
 */
const DurationOfFallingAsleep: React.FC = () => {
  const layout = {
    width: '80%',
    height: 200
  }
  return (
    <div className='responsiveChart'>
      <h3>время, потраченное на засыпание в минутах за 1 день</h3>
      <ResponsiveContainer {...layout}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis dataKey='fallingSleepMinutes' />
          <Tooltip />
          <Legend />
          <Bar 
            name='время, потраченное на засыпание в минутах' 
            dataKey="fallingSleepMinutes" 
            fill="#4F81BD" 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default DurationOfFallingAsleep;