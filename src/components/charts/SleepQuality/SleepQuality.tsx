import React from 'react';
import './SleepQuality.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useStore } from '../../../hooks';
import { FailedRequest, LoaderChart, NotEnoughtData, prepareDate } from '../../common';

const layout = {
  width: '80%',
  height: 200
}

/**
 * оценка качества сна 
 * (за 1 день, средняя продолжительность за неделю)
 * @returns 
 */
const SleepQuality: React.FC = () => {
  const { question_14_data, question_14_load } = useStore()

  let data: {
    date: string,
    sleepQuantiti: string,
  }[] = prepareDate(question_14_data).map(({ cdate, answer_text }) => ({ date: cdate, sleepQuantiti: answer_text }));

  
  /** Недостаточно данных */
  const isNotEnought = !data.length;
  const isLoad = question_14_load === 'LOADING';
  const isFailed = question_14_load === 'FAILED';
  
  return (
    <div className='responsiveChart'>
      <h3>Оценка качества сна</h3>
      {isFailed
        ? <FailedRequest />
        : isLoad
          ? <LoaderChart isLoad={isLoad} />
          : isNotEnought
            ? <NotEnoughtData />
            : null
      }
      <ResponsiveContainer {...layout}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" height={60} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            strokeWidth={2}
            name='Качество сна'
            dataKey="sleepQuantiti"
            stroke="#4A7EBB"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SleepQuality;