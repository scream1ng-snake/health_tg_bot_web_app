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
import { 
  fakeData, 
  http, 
  LastWeek, 
  NotEnoughtData, 
  prepareDate, 
  WithAverage 
} from '../../common';
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
  /** Недостаточно данных */
  const isNotEnought = !data.length;

  const arras = (arr: answer[]) => {
    console.log('arr')
    console.log(arr)
    return arr;
  }

  React.useEffect(() => {
    console.log('useeefeefetete')
    http.post('question_1')
      .then(LastWeek)
      .then(prepareDate)
      .then(WithAverage)
      .then(setData)
      .catch(console.log)
  }, [])
  return (
    <div className='responsiveChart'>
      <h3 className='subtitle'>Длительность дневного сна</h3>
      {isNotEnought ? <NotEnoughtData /> : null}
      <ResponsiveContainer {...layout}>
        <BarChart data={isNotEnought ? fakeData() : data}>
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