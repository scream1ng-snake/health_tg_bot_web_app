import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { useStore } from '../../../hooks';
import {
  FailedRequest,
  fakeData,
  NotEnoughtData,
  prepareDate,
  WithAverage,
} from '../../common';
import { LoaderChart } from '../../common/Loader/Loader';
import './DurationOfDaytimeSleep.css';

const layout = {
  width: '80%',
  height: 200
}

/**
 * длительность дневного сна 
 * @returns 
 */
const DurationOfDaytimeSleep: React.FC = () => {
  const { question_1_data, question_1_load } = useStore();

  const isLoad = question_1_load === 'LOADING';
  const isFailed = question_1_load === 'FAILED';

  const data = WithAverage(prepareDate(question_1_data))

  /** Недостаточно данных */
  const isNotEnought = !data.length;
  return (
    <div className='responsiveChart'>
      <h3 className='subtitle'>Длительность дневного сна</h3>
      {isFailed
        ? <FailedRequest />
        : isLoad
          ? <LoaderChart isLoad={isLoad} />
          : isNotEnought
            ? <NotEnoughtData />
            : null
      }
      <ResponsiveContainer {...layout}>
        <BarChart data={isFailed || (isLoad || isNotEnought) ? fakeData() : data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="cdate" />
          <YAxis dataKey='answer_text' />
          <Tooltip />
          <Legend />
          <Bar name='Длительность дневного сна' dataKey="answer_text" fill="#4F81BD" >
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
};

export default DurationOfDaytimeSleep;