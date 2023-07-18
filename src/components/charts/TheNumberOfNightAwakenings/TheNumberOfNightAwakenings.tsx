import React from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer, Cell } from 'recharts';
import { useStore } from '../../../hooks';
import { FailedRequest, LoaderChart, NotEnoughtData, prepareDate, WithAverage } from '../../common';
import './TheNumberOfNightAwakenings.css';

const layout = {
  width: '80%',
  height: 200
}

/**
 * количество ночных пробуждений 
 * (за 1 день, средняя продолжительность за неделю)
 * @returns 
 */
const TheNumberOfNightAwakenings: React.FC = () => {

  const { question_9_data, question_9_load } = useStore();

  let data = WithAverage(prepareDate(question_9_data))

  /** Недостаточно данных */
  const isNotEnought = !data.length;
  const isLoad = question_9_load === 'LOADING';
  const isFailed = question_9_load === 'FAILED';


  return (
    <div className='responsiveChart'>
      <h3>Количество ночных пробуждений</h3>
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
            name='Количество ночных пробуждений'
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

export default TheNumberOfNightAwakenings;