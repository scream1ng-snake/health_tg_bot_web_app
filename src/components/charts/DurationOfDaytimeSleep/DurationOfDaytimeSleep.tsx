import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer
} from 'recharts';
import { useLoading, useStore } from '../../../hooks';
import {
  FailedRequest,
  fakeData,
  http,
  isDoctorPage,
  NotEnoughtData,
  prepareDate,
  WithAverage
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
  const [data, setData] = React.useState<answer[]>([]); 

  const { currentUser, selectedUser, startDate, endDate } = useStore()

  const { isFailed, isLoad, onStart, onFailed, onSussess } = useLoading();

  /** Недостаточно данных */
  const isNotEnought = !data.length;

  const fetchData = (userId: string) => {
    onStart();
    http.post(userId, 'question_1', startDate, endDate)
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
  }, [])
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
          <Bar name='Длительность дневного сна' dataKey="answer_text" fill="#4F81BD" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
};

export default DurationOfDaytimeSleep;