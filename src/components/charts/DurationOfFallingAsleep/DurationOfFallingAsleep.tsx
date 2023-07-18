import React from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer, Cell } from 'recharts';
import { useStore } from '../../../hooks';
import { FailedRequest, LoaderChart, NotEnoughtData, prepareDate, WithAverage } from '../../common';
import './DurationOfFallingAsleep.css';

const layout = {
  width: '80%',
  height: 200
}


/**
 * время, потраченное на засыпание в минутах за 1 день, 
 * средняя продолжительность за неделю 
 * (отображать норму - менее 30 минут)
 * @returns 
 */
const DurationOfFallingAsleep: React.FC = () => {

  const { question_8_data, question_8_load } = useStore();
  const isLoad = question_8_load === 'LOADING';
  const isFailed = question_8_load === 'FAILED';

  let data = WithAverage(prepareDate(question_8_data))

  /** Недостаточно данных */
  const isNotEnought = !data.length;

  return (
    <div className='responsiveChart'>
      <h3>Время, потраченное на засыпание в минутах за 1 день</h3>
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
            name='Время, потраченное на засыпание в минутах'
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

export default DurationOfFallingAsleep;