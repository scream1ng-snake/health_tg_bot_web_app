import React from 'react';
import './TakingSleepingPills.css';
import { PieChart, Pie, Legend, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { renderCustomizedLabel } from '../helpers';


const data02 = [
  { name: "дней с приемом снотворных", value: 5, color: '#8884d8' },
  { name: "дней без приема снотворных", value: 2, color: '#82ca9d' },
];

/**
 * число дней с приемом снотворных за неделю (абсолютное значение) 
 * @returns 
 */
const TakingSleepingPills: React.FC = () => {
  const layout = {
    width: '80%',
    height: 300
  }
  return (
    <div className='responsiveChart'>
      <h3>число дней с приемом снотворных за неделю (абсолютное значение) </h3>
      <ResponsiveContainer {...layout}>
        <PieChart width={1000} height={400}>
          <Pie
            fill="#8884d8"
            dataKey="value"
            data={data02}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
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

export default TakingSleepingPills;