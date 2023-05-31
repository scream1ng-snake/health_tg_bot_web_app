import React from 'react';
import './AlcoholIntake.css';
import { PieChart, Pie, Legend, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { renderCustomizedLabel } from '../helpers';

const data02 = [
  { name: "дней приема алкоголя", value: 3, color: '#8884d8' },
  { name: "дней без приема алкоголя", value: 4, color: '#82ca9d' },
];

/**
 * число дней с приемом алкоголя за неделю (абсолютное значение)
 * @returns 
 */
const AlcoholIntake: React.FC = () => {
  const layout = {
    width: '80%',
    height: 300
  }
  return (
    <div className='responsiveChart'>
      <h3>число дней с приемом алкоголя за неделю (абсолютное значение)</h3>
      <ResponsiveContainer {...layout}>
        <PieChart>
          <Pie
            fill="#8884d8"
            dataKey="value"
            data={data02}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            innerRadius={70}
          >
            {data02.map((entry, index) =>
              <Cell key={`cell-${index}`} fill={entry.color} />
            )}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

    </div>
  )
}

export default AlcoholIntake;