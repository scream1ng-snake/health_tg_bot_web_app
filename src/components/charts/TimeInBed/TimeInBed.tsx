import moment from 'moment';
import React from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';
import { useLoading, useStore } from '../../../hooks';
import { FailedRequest, findOneOrFindLast, http, isDoctorPage, LoaderChart, NotEnoughtData, prepareDate, strTimeToNum, validateHHMMstr, withoutDuplicates } from '../../common';
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
  const [
    goIntoBedData,
    setGoIntoBedData
  ] = React.useState<answer[]>([]);

  const [
    goOutOfBedData,
    setGoOutOfBedData
  ] = React.useState<answer[]>([]);

  const { currentUser, selectedUser, startDate, endDate } = useStore()

  const { isFailed, isLoad, onStart, onFailed, onSussess } = useLoading();


  const fetchData = (userId: string) => {
    onStart();
    http.post(userId, 'question_6', startDate, endDate)
      .then(withoutDuplicates)
      .then(setGoIntoBedData)
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
  // тут считаем разницу между временем отхода ко сну 
  // и временем вставания с пастели, 
  // для каждого отхода ко сну должен быть ответ вставания с постели 
  goIntoBedData.forEach((goIntoItem) => {
    // в диапазоне ответов ищем тот ответ, который был сделан 
    // в тот же день 
    // (если есть дубликаты в один день, то берется только последнее значение по времени) 
    const goOutItemExists = findOneOrFindLast(
      goOutOfBedData,
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
        let differenceInMins = (Number(goOutH) * 60 + Number(goOutM)) - (Number(goIntoH) * 60 + Number(goIntoM));
        if(differenceInMins < 0) differenceInMins = 0
        const differenceM = differenceInMins % 60;
        const differenceH = Math.floor(differenceInMins / 60);
        data.push({
          answer_text: [differenceH, differenceM].join(':'),
          cdate: goIntoItem.cdate
        })
      }
    }
  })
  data = prepareDate(data)

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
        <BarChart data={strTimeToNum(data)}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="cdate" />
          <YAxis dataKey='answer_text'/>
          <Tooltip />
          <Legend />
          <Bar name='Время нахождения в постели' dataKey="answer_text" fill="#4F81BD" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TimeInBed;