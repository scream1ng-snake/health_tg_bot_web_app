import moment from 'moment';
import React from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer, Cell } from 'recharts';
import { useStore } from '../../../hooks';
import { 
  FailedRequest, 
  findOneOrFindLast, 
  LoaderChart, 
  NotEnoughtData, 
  prepareDate, 
  strTimeToNum, 
  validateHHMMstr, 
  WithAverageInt, 
} from '../../common';
import './TimeSpentInBedAfterWakingUp.css';

const layout = {
  width: '80%',
  height: 200
}

/**
 * время в постели от пробуждения до подъема 
 * (за 1 день, средняя продолжительность за неделю) в минутах
 * @returns 
 */
const TimeSpentInBedAfterWakingUp: React.FC = () => {

  const { 
    question_11_data, 
    question_11_load, 
    question_12_data, 
    question_12_load 
  } = useStore()

  let data: answer[] = [];
  // тут считаем разницу между временем пробуждения 
  // и временем вставания с пастели, 
  // для каждого просыпания должен быть ответ вставания с постели 
  question_11_data.forEach((awakesTimeAnswer) => {
    // в диапазоне ответов ищем тот ответ, который был сделан 
    // в тот же день 
    // (если есть дубликаты в один день, то берется только последнее значение по времени) 
    const goOutItemExists = findOneOrFindLast(
      question_12_data,
      (goOut) => moment(goOut.cdate).isSame(moment(awakesTimeAnswer.cdate), 'day')
    )
    // если нашлось совпадение
    if (goOutItemExists) {
      // то валидируем их
      const isValidDates = validateHHMMstr(awakesTimeAnswer.answer_text)
        && validateHHMMstr(goOutItemExists.answer_text)

      // если ответы валидны
      if (isValidDates) {
        // считаем разницу
        const goOutH = goOutItemExists.answer_text.split(':')[0]; // левая часть - часы
        const goOutM = goOutItemExists.answer_text.split(':')[1]; // правая часть - минутки

        const awakeH = awakesTimeAnswer.answer_text.split(':')[0];
        const awakeM = awakesTimeAnswer.answer_text.split(':')[1];

        // разница в минутках
        let differenceInMins = (Number(goOutH) * 60 + Number(goOutM)) - (Number(awakeH) * 60 + Number(awakeM));
        if (differenceInMins < 0) differenceInMins = 0
        const differenceM = differenceInMins % 60; // остаток деления в минутках
        const differenceH = Math.floor(differenceInMins / 60); // целое в часах
        data.push({
          answer_text: [differenceH, differenceM].join(':'),
          cdate: awakesTimeAnswer.cdate
        })
      }
    }
  })
  //@ts-ignore
  data = WithAverageInt(strTimeToNum(prepareDate(data)))

  /** Недостаточно данных */
  const isNotEnought = !data.length;
  const isLoad = question_12_load === 'LOADING' || question_11_load === 'LOADING';
  const isFailed = question_12_load === 'FAILED' || question_11_load === 'FAILED';
  return (
    <div className='responsiveChart'>
      <h3>Время нахождения в постели после пробуждения</h3>
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
            name='Время нахождения в постели после пробуждения'
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

export default TimeSpentInBedAfterWakingUp;