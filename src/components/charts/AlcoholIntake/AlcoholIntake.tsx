import React from 'react';
import './AlcoholIntake.css';
import { PieChart, Pie, Legend, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { renderCustomizedLabel } from '../helpers';
import { useLoading, useStore } from '../../../hooks';
import { FailedRequest, http, isDoctorPage, LoaderChart, NotEnoughtData, prepareDate } from '../../common';
//import { http } from '../../common';

const layout = {
  width: '80%',
  height: 300
}

/**
 * число дней с приемом алкоголя за неделю (абсолютное значение)
 * @returns 
 */
const AlcoholIntake: React.FC = () => {
  const [data, setData] = React.useState<answer[]>([]);

  const { currentUser, selectedUser, startDate, endDate } = useStore()

  const { isFailed, isLoad, onStart, onFailed, onSussess } = useLoading();

  /** Недостаточно данных */
  const isNotEnought = !data.length;

  const fetchData = (userId: string) => {
    onStart();
    http.post(userId, 'question_4', startDate, endDate)
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

  let daysWithAlco = 0;
  for(const item of data) {
    if(item.answer_text === 'true') daysWithAlco++
  }

  const data02 = [
    {
      name: "дней приема алкоголя",
      value: daysWithAlco,
      color: '#8884d8'
    },
    {
      name: "дней без приема алкоголя",
      value: (data.length - daysWithAlco) ?? 7,
      color: '#82ca9d'
    },
  ];
  return (
    <div className='responsiveChart'>
      <h3>Число дней с приемом алкоголя за неделю (абсолютное значение)</h3>
      {isFailed
        ? <FailedRequest />
        : isLoad
          ? <LoaderChart isLoad={isLoad} />
          : isNotEnought
            ? <NotEnoughtData />
            : null
      }
      <ResponsiveContainer {...layout}>
        <PieChart>
          <Pie
            fill="#8884d8"
            dataKey="value"
            data={data02}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            innerRadius={70}
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

export default AlcoholIntake;