import moment from "moment";

/** Получить дату из ISO строки */
export const prepareDate = (arr: answer[]) => arr
  .reverse()
  .map((answer) => ({
    ...answer,
    cdate: moment(answer.cdate).utc().format('YYYY-MM-DD'),
  }))

/** Посчитать среднее арифметическое */
export const WithAverage = (arr: answer[]): answer[] => (
  arr.length
    ? ([
      ...arr,
      {
        answer_text: arr.reduce((acc, cur) => acc + Number(cur.answer_text), 0) / arr.length,
        cdate: 'Средняя'
      }
    ]) : ([])
)

/** Данные за последнюю неделю */
export const LastWeek = (arr: Array<answer>) =>
  arr.length >= 7
    ? arr.filter((answer) => moment(answer.answer_text).isAfter(moment().subtract(7, 'days').toISOString()))
    : arr


/** последняя неделя до сегодняшнего дня ISO str array */
export const LastWeekUntilToday = () =>
  Array.from(Array(7)).map((val, index) =>
    moment().subtract(index + 1, 'days').toISOString()
  )

export const fakeData = (): answer[] =>
  Array.from(Array(7)).map(() => ({
    answer_text: 0, // getRandomNum(12, 2),
    cdate: moment(getToday()).utc().format('YYYY-MM-DD')
  }))

/** Сегодняшний день ISOstr */
export const getToday = () => new Date().toISOString()

export const getRandomNum = (
  maximum: number,
  minimum: number,
) => (
  Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
)

export const isDoctorPage = () => window.location.hash === '#doctor'