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
        answer_text: String(Math.ceil(arr.reduce((acc, cur) => acc + Number(cur.answer_text), 0) / arr.length * 10) / 10),
        cdate: 'Средняя'
      }
    ]) : ([])
)
/** Посчитать среднее арифметическое */
export const WithAverageInt = (arr: { answer_text: number, cdate: string }[]): { answer_text: number, cdate: string }[] => (
  arr.length
    ? ([
      ...arr,
      {
        answer_text: Math.ceil(arr.reduce((acc, cur) => acc + Number(cur.answer_text), 0) / arr.length * 10) / 10,
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
    answer_text: String(0), // String(getRandomNum(12, 2)),
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

export const validateHHMMstr = (str: string) =>
  /^(?:\d|[0-1]\d|2[0-3]):(?:\d|[0-5]\d)$/.test(str)


/** 
 * Если в массиве нашелся один элемент, то вернуть его 
 * Если в массиве нашлось много элементов, то вернуть последний
 * Если не нашлось, null
*/
export function findOneOrFindLast(
  data: answer[],
  predicate: (item: answer) => boolean
) {
  const items = data.filter(predicate)
  if (items.length === 1) return items[0];
  if (items.length > 1) return items[items.length - 1];
  if (!items.length) return null;
  return null;
}

/**
 * Удаляет дублирующиеся по времени записи 
 * и оставляет только последнюю 
 */
export function withoutDuplicates(inputArray: answer[]) {
  const outputArray = inputArray
    .reduce((arr, item) => {
      if (arr.length && arr.some((o) => moment(o.cdate).isSame(moment(item.cdate), 'day'))) return arr;
      // if (arr.length && arr.some((o) => o.cdate == item.cdate)) return arr;
      arr.push(item)
      return arr;
    }, [] as answer[])

  return outputArray;
}


export const strTimeToNum = (array: answer[]) =>
  array.map(({ cdate, answer_text }) => ({
    cdate,
    answer_text: Number(answer_text.replace(':', '.'))
  }))