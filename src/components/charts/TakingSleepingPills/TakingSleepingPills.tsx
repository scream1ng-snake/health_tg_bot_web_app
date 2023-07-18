import React from 'react';
import './TakingSleepingPills.css';
import { PieChart, Pie, Legend, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { renderCustomizedLabel } from '../helpers';
import { useStore } from '../../../hooks';
import { FailedRequest, LoaderChart, NotEnoughtData, prepareDate } from '../../common';

const layout = {
  width: '80%',
  height: 300
}

/**
 * число дней с приемом снотворных за неделю (абсолютное значение) 
 * @returns 
 */
const TakingSleepingPills: React.FC = () => {
  const { question_5_data, question_5_load } = useStore();

  const data = prepareDate(question_5_data);

  /** Недостаточно данных */
  const isNotEnought = !data.length;

  const isLoad = question_5_load === 'LOADING';
  const isFailed = question_5_load === 'FAILED';


  const daysWithPills = data.reduce((acc, cur) =>
    cur.answer_text === 'true'
      ? acc+=1
      : acc+=0,
    0
  )
  const data02 = [
    { 
      name: "Дней с приемом снотворных", 
      value: daysWithPills, 
      color: '#8884d8' 
    },
    { 
      name: "Дней без приема снотворных", 
      value: data.length - daysWithPills, 
      color: '#82ca9d' 
    },
  ];

  return (
    <div className='responsiveChart'>
      <h3>число дней с приемом снотворных за неделю (абсолютное значение) </h3>
      {isFailed
        ? <FailedRequest />
        : isLoad
          ? <LoaderChart isLoad={isLoad} />
          : isNotEnought
            ? <NotEnoughtData />
            : null
      }
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