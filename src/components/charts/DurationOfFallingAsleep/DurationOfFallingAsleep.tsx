import React from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer, Cell } from 'recharts';
import { useLoading, useStore } from '../../../hooks';
import { FailedRequest, http, isDoctorPage, LoaderChart, NotEnoughtData, prepareDate, WithAverage, withoutDuplicates } from '../../common';
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
  const [data, setData] = React.useState<answer[]>([]);

  const { currentUser, selectedUser, startDate, endDate } = useStore();

  const { isFailed, isLoad, onStart, onFailed, onSussess } = useLoading();

  /** Недостаточно данных */
  const isNotEnought = !data.length;

  const fetchData = (userId: string) => {
    onStart();
    http.post(userId, 'question_8', startDate, endDate)
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