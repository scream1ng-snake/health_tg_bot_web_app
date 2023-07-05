import React from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer, Cell } from 'recharts';
import { useLoading, useStore } from '../../../hooks';
import { FailedRequest, http, isDoctorPage, LoaderChart, NotEnoughtData, prepareDate, WithAverage, withoutDuplicates } from '../../common';
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
  const [data, setData] = React.useState<answer[]>([]);

  const { currentUser, selectedUser, startDate, endDate } = useStore();

  const { isFailed, isLoad, onStart, onFailed, onSussess } = useLoading();

  /** Недостаточно данных */
  const isNotEnought = !data.length;

  const fetchData = (userId: string) => {
    onStart();
    http.post(userId, 'question_9', startDate, endDate)
      .then(withoutDuplicates)
      .then(prepareDate)
      .then(WithAverage)
      .then(setData)
      .then(onSussess)
      .catch(onFailed)
  }

  React.useEffect(() => {
    if (isDoctorPage()) {
      if (selectedUser) fetchData(selectedUser)
    } else {
      if (currentUser) fetchData(currentUser)
    }
    // eslint-disable-next-line
  }, [startDate, endDate, currentUser, selectedUser])
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