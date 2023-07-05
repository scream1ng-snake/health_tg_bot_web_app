import moment from 'moment';
import React from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer, Cell } from 'recharts';
import { useLoading, useStore } from '../../../hooks';
import { 
  FailedRequest, 
  findOneOrFindLast, 
  http, 
  isDoctorPage, 
  LoaderChart, 
  NotEnoughtData, 
  prepareDate, 
  strTimeToNum, 
  validateHHMMstr, 
  WithAverageInt, 
  withoutDuplicates 
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
  /** проснулся */
  const [
    awakesTimeData,
    setAwakesTimeData
  ] = React.useState<answer[]>([]);

  /** встал с кровати */
  const [
    goOutOfBedData,
    setGoOutOfBedData
  ] = React.useState<answer[]>([]);

  const { currentUser, selectedUser, startDate, endDate } = useStore()

  const { isFailed, isLoad, onStart, onFailed, onSussess } = useLoading();


  const fetchData = (userId: string) => {
    onStart();
    http.post(userId, 'question_11', startDate, endDate)
      .then(withoutDuplicates)
      .then(setAwakesTimeData)
      .catch(onFailed)
    http.post(userId, 'question_12', startDate, endDate)
      .then(withoutDuplicates)
      .then(setGoOutOfBedData)
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

  let data: answer[] = [];
  // тут считаем разницу между временем пробуждения 
  // и временем вставания с пастели, 
  // для каждого просыпания должен быть ответ вставания с постели 
  awakesTimeData.forEach((awakesTimeAnswer) => {
    // в диапазоне ответов ищем тот ответ, который был сделан 
    // в тот же день 
    // (если есть дубликаты в один день, то берется только последнее значение по времени) 
    const goOutItemExists = findOneOrFindLast(
      goOutOfBedData,
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