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
import './TimeInBed.css';



const layout = {
  width: '80%',
  height: 200
}

/**
 * соблюдение времени нахождения в постели 
 * (авто расчет разницы времени отхода ко сну и времени подъема за 1 день, 
 * средняя продолжительность за неделю) в часах
 * @returns 
 */
const TimeInBed: React.FC = () => {

  const { 
    question_6_data, 
    question_6_load, 
    question_12_data, 
    question_12_load 
  } = useStore()

  const isLoad = question_12_load === 'LOADING' || question_6_load === 'LOADING';
  const isFailed = question_12_load === 'FAILED' || question_6_load === 'FAILED';


  let data: answer[] = [];
  // тут считаем разницу между временем отхода ко сну 
  // и временем вставания с пастели, 
  // для каждого отхода ко сну должен быть ответ вставания с постели 
  question_6_data.forEach((goIntoItem) => {
    // в диапазоне ответов ищем тот ответ, который был сделан 
    // в тот же день 
    // (если есть дубликаты в один день, то берется только последнее значение по времени) 
    const goOutItemExists = findOneOrFindLast(
      question_12_data,
      (goOut) => moment(goOut.cdate).isSame(moment(goIntoItem.cdate), 'day')
    )
    // если нашлось совпадение
    if (goOutItemExists) {
      // то валидируем их
      const isValidDates = validateHHMMstr(goIntoItem.answer_text)
        && validateHHMMstr(goOutItemExists.answer_text)

      // если ответы валидны
      if (isValidDates) {
        // считаем разницу
        const goOutH = goOutItemExists.answer_text.split(':')[0]
        const goOutM = goOutItemExists.answer_text.split(':')[1]

        const goIntoH = goIntoItem.answer_text.split(':')[0]
        const goIntoM = goIntoItem.answer_text.split(':')[1]

        // разница в минутках
        const оставшиесяВчерашниеМинутки = (24 * 60) - (Number(goIntoH) * 60 + Number(goIntoM));
        const всеСегодняшниеМинутки = Number(goOutH) * 60 + Number(goOutM);

        let differenceInMins = оставшиесяВчерашниеМинутки + всеСегодняшниеМинутки;

        if (differenceInMins < 0) differenceInMins = 0
        const differenceM = differenceInMins % 60;
        const differenceH = Math.floor(differenceInMins / 60);
        data.push({
          answer_text: [differenceH, differenceM].join(':'),
          cdate: goIntoItem.cdate
        })
      }
    }
  })
  //@ts-ignore
  data = WithAverageInt(strTimeToNum(prepareDate(data)))

  /** Недостаточно данных */
  const isNotEnought = !data.length;

  return (
    <div className='responsiveChart'>
      <h3>Время нахождения в постели</h3>
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
          <Bar name='Время нахождения в постели' dataKey="answer_text" fill="#4F81BD" >
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

export default TimeInBed;