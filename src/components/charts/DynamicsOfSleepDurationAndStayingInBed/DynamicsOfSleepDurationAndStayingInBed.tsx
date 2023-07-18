import React, { FunctionComponent } from 'react';
import './DynamicsOfSleepDurationAndStayingInBed.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer
} from "recharts";
import { 
  FailedRequest, 
  findOneOrFindLast, 
  LoaderChart, 
  NotEnoughtData, 
  validateHHMMstr, 
} from '../../common';
import { useStore } from '../../../hooks';
import moment from 'moment';


const layout = {
  width: '80%',
  height: 200
}


/**
 * динамика длительности сна и времени, 
 * проведенного в постели (за каждый день)
 * в часах или в минутах в зависимости от удобства вычислений
 * @returns 
 */
const DynamicsOfSleepDurationAndStayingInBed: React.FC = () => {
  const { 
    question_6_data, 
    question_6_load, 
    question_12_data, 
    question_12_load, 
    question_7_data, 
    question_7_load, 
    question_11_data, 
    question_11_load 
  } = useStore()

  let data: {
    date: string,
    timeInBedMinutes: number,
    timeSleepingMinutes: number
  }[]  = [];

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

        let timeInBedDifferenceInMins = оставшиесяВчерашниеМинутки + всеСегодняшниеМинутки;

        if (timeInBedDifferenceInMins < 0) timeInBedDifferenceInMins = 0
        data.push({
          timeInBedMinutes: timeInBedDifferenceInMins,
          date: moment(goIntoItem.cdate).utc().format('YYYY-MM-DD'),
          timeSleepingMinutes: 0
        })
      }
    }
  })

  // тут считаем разницу между временем засыпания 
  // и временем пробуждения, 
  // для каждого засыпания должен быть ответ со временем пробуждения 
  question_7_data.forEach((whenFellAsleepItem) => {
    // в диапазоне ответов ищем тот ответ, который был сделан 
    // в тот же день 
    // (если есть дубликаты в один день, то берется только последнее значение по времени) 
    const awakeningTimeExists = findOneOrFindLast(
      question_11_data,
      (awakeningTime) => moment(awakeningTime.cdate).isSame(moment(whenFellAsleepItem.cdate), 'day')
    )
    // если нашлось совпадение
    if (awakeningTimeExists) {
      // то валидируем их
      const isValidDates = validateHHMMstr(whenFellAsleepItem.answer_text)
        && validateHHMMstr(awakeningTimeExists.answer_text)

      // если ответы валидны
      if (isValidDates) {
        // считаем разницу
        const awakeningTimeH = awakeningTimeExists.answer_text.split(':')[0]
        const awakeningTimeM = awakeningTimeExists.answer_text.split(':')[1]

        const fellAsleepH = whenFellAsleepItem.answer_text.split(':')[0]
        const fellAsleepM = whenFellAsleepItem.answer_text.split(':')[1]

        // разница в минутках
        const оставшиесяВчерашниеМинутки = (24 * 60) - (Number(fellAsleepH) * 60 + Number(fellAsleepM));
        const всеСегодняшниеМинутки = Number(awakeningTimeH) * 60 + Number(awakeningTimeM);

        let timeSleepingDifferenceInMins = оставшиесяВчерашниеМинутки + всеСегодняшниеМинутки;

        if (timeSleepingDifferenceInMins < 0) timeSleepingDifferenceInMins = 0

        const timeInBedExists = data.find((dataItem) => 
          moment(dataItem.date)
            .isSame(moment(whenFellAsleepItem.cdate), 'day'))

        if(timeInBedExists) timeInBedExists.timeSleepingMinutes = timeSleepingDifferenceInMins
      }
    }
  })

  /** Недостаточно данных */
  const isNotEnought = !data.length;
  const isLoad = question_12_load === 'LOADING' 
    || question_11_load === 'LOADING'
    || question_7_load === 'LOADING'
    || question_6_load === 'LOADING'

  const isFailed = question_12_load === 'FAILED' 
    || question_11_load === 'FAILED'
    || question_7_load === 'FAILED'
    || question_6_load === 'FAILED'
    
  

  return (
    <div className='responsiveChart'>
      <h3>динамика длительности сна и времени, проведенного в постели</h3>
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
          <XAxis dataKey="date" height={60} tick={<CustomizedAxisTick />} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            strokeWidth={2}
            name='Время в постели, мин.'
            dataKey="timeInBedMinutes"
            stroke="#BE4B48"
          >
            <LabelList content={<CustomizedLabel />} />
          </Line>
          <Line
            strokeWidth={2}
            name='Время сна, мин.'
            dataKey="timeSleepingMinutes"
            stroke="#4A7EBB"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default DynamicsOfSleepDurationAndStayingInBed;

const CustomizedLabel: FunctionComponent<any> = (props: any) => {
  const { x, y, stroke, value } = props;

  return (
    <text x={x} y={y} dy={-10} fill={stroke} fontSize={15} textAnchor="middle">
      {value}
    </text>
  );
};

const CustomizedAxisTick: FunctionComponent<any> = (props: any) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
      >
        {payload.value}
      </text>
    </g>
  );
};

