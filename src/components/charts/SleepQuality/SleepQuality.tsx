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
import { useLoading, useStore } from '../../../hooks';
import { FailedRequest, http, isDoctorPage, LoaderChart, NotEnoughtData, prepareDate, withoutDuplicates } from '../../common';

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
  const [
    answers,
    setAnswers
  ] = React.useState<answer[]>([]); 

  
  const { currentUser, selectedUser, startDate, endDate } = useStore()

  const { isFailed, isLoad, onStart, onFailed, onSussess } = useLoading(); 

  
  const fetchData = (userId: string) => {
    onStart();
    // грузим данные для высчета времени нахождения пастели
    http.post(userId, 'question_14', startDate, endDate)
      .then(withoutDuplicates)
      .then(prepareDate)
      .then(setAnswers)
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


  let data: {
    date: string,
    sleepQuantiti: string,
  }[] = answers.map(({ cdate, answer_text }) => ({ date: cdate, sleepQuantiti: answer_text }));

  
  /** Недостаточно данных */
  const isNotEnought = !data.length;
  
  return (
    <div className='responsiveChart'>
      <h3>оценка качества сна</h3>
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