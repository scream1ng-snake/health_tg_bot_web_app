import React from 'react';
import './TakingSleepingPills.css';
import { PieChart, Pie, Legend, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { renderCustomizedLabel } from '../helpers';
import { useLoading, useStore } from '../../../hooks';
import { FailedRequest, http, isDoctorPage, LoaderChart, NotEnoughtData, prepareDate } from '../../common';

const layout = {
  width: '80%',
  height: 300
}

/**
 * число дней с приемом снотворных за неделю (абсолютное значение) 
 * @returns 
 */
const TakingSleepingPills: React.FC = () => {
  const [data, setData] = React.useState<answer[]>([]);

  const { currentUser, selectedUser, startDate, endDate } = useStore()

  const { isFailed, isLoad, onStart, onFailed, onSussess } = useLoading();

  /** Недостаточно данных */
  const isNotEnought = !data.length;

  const fetchData = (userId: string) => {
    onStart();
    http.post(userId, 'question_5', startDate, endDate)
      .then(prepareDate)
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