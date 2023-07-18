import React from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer, Cell } from 'recharts';
import { useStore } from '../../../hooks';
import { FailedRequest, LoaderChart, NotEnoughtData, prepareDate, WithAverage } from '../../common';
import './TheTotalDurationOfNightAwakenings.css';

const layout = {
  width: '80%',
  height: 200
}


/**
 * суммарная длительность ночных пробуждений за ночь, 
 * среднее значение за неделю 
 * (за 1 день, средняя продолжительность за неделю) в минутах
 * @returns 
 */
const TheTotalDurationOfNightAwakenings: React.FC = () => {

  const { question_10_data, question_10_load } = useStore();

  let data = WithAverage(prepareDate(question_10_data.reverse()))

  /** Недостаточно данных */
  const isNotEnought = !data.length;
  const isLoad = question_10_load === 'LOADING';
  const isFailed = question_10_load === 'FAILED';

  return (
    <div className='responsiveChart'>
      <h3>Суммарная длительность ночных пробуждений за ночь</h3>
      {isFailed
        ? <FailedRequest />
        : isLoad
          ? <LoaderChart isLoad={isLoad} />
          : isNotEnought
            ? <NotEnoughtData />
            : null
      }
      <ResponsiveContainer {...layout}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="cdate" />
          <YAxis dataKey='answer_text' />
          <Tooltip />
          <Legend />
          <Bar
            name='Суммарная длительность пробуждений за ночь, мин'
            dataKey="answer_text"
            fill="#4F81BD"
          >
            {
              data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.cdate === 'Средняя' ? '#4FBDA3' : '#4F81BD'} />
              ))
            }
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TheTotalDurationOfNightAwakenings;