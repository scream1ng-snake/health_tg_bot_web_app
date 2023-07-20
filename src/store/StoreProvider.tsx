import React from 'react';
import { getNow, getOneWeekAgo, http, isDoctorPage, withoutDuplicates } from '../components/common';
import useTelegram from '../hooks/useTelegram';


export const StoreContext = React.createContext({
  isDoctor: false,
  setIsDoctor: (bool: boolean) => { },
  /** текущий пользователь телеги */
  currentUser: null as Optional<string>,
  users: [] as user[],
  setUsers: (users: user[]) => { },
  /** просматриваемый пользователь */
  selectedUser: null as Optional<string>,
  setSelectedUser: (user: string) => { },
  /** начальная дата */
  startDate: getOneWeekAgo(),
  setStartDate: (date: string) => { },
  /** конечная дата */
  endDate: getNow(),
  setEndDate: (date: string) => { },

  question_1_data: [] as answer[],
  question_2_data: [] as answer[],
  question_3_data: [] as answer[],
  question_4_data: [] as answer[],
  question_5_data: [] as answer[],
  question_6_data: [] as answer[],
  question_7_data: [] as answer[],
  question_8_data: [] as answer[],
  question_9_data: [] as answer[],
  question_10_data: [] as answer[],
  question_11_data: [] as answer[],
  question_12_data: [] as answer[],
  question_13_data: [] as answer[],
  question_14_data: [] as answer[],
  question_1_load: 'INITIAL' as LoadStatesType,
  question_2_load: 'INITIAL' as LoadStatesType,
  question_3_load: 'INITIAL' as LoadStatesType,
  question_4_load: 'INITIAL' as LoadStatesType,
  question_5_load: 'INITIAL' as LoadStatesType,
  question_6_load: 'INITIAL' as LoadStatesType,
  question_7_load: 'INITIAL' as LoadStatesType,
  question_8_load: 'INITIAL' as LoadStatesType,
  question_9_load: 'INITIAL' as LoadStatesType,
  question_10_load: 'INITIAL' as LoadStatesType,
  question_11_load: 'INITIAL' as LoadStatesType,
  question_12_load: 'INITIAL' as LoadStatesType,
  question_13_load: 'INITIAL' as LoadStatesType,
  question_14_load: 'INITIAL' as LoadStatesType,
});


export const StoreProvider = ({ children }: {
  children: React.ReactNode
}) => {
  const [currentUser] = React.useState<Optional<string>>(useTelegram().user_id);
  const [selectedUser, setSelectedUser] = React.useState('');

  /** конечная дата по умолчанию */
  const now = getNow()
  /** начальная дата по умолчанию */
  const oneWeekAgo = getOneWeekAgo()

  /** начальная дата */
  const [startDate, setStartDate] = React.useState(oneWeekAgo);
  /** конечная дата */
  const [endDate, setEndDate] = React.useState(now);

  /** список пациентов */
  const [users, setUsers] = React.useState<user[]>([]);


  const [question_1_data, setQuestion_1_data] = React.useState<answer[]>([]);
  const [question_2_data, setQuestion_2_data] = React.useState<answer[]>([]);
  const [question_3_data, setQuestion_3_data] = React.useState<answer[]>([]);
  const [question_4_data, setQuestion_4_data] = React.useState<answer[]>([]);
  const [question_5_data, setQuestion_5_data] = React.useState<answer[]>([]);
  const [question_6_data, setQuestion_6_data] = React.useState<answer[]>([]);
  const [question_7_data, setQuestion_7_data] = React.useState<answer[]>([]);
  const [question_8_data, setQuestion_8_data] = React.useState<answer[]>([]);
  const [question_9_data, setQuestion_9_data] = React.useState<answer[]>([]);
  const [question_10_data, setQuestion_10_data] = React.useState<answer[]>([]);
  const [question_11_data, setQuestion_11_data] = React.useState<answer[]>([]);
  const [question_12_data, setQuestion_12_data] = React.useState<answer[]>([]);
  const [question_13_data, setQuestion_13_data] = React.useState<answer[]>([]);
  const [question_14_data, setQuestion_14_data] = React.useState<answer[]>([]);

  let [question_1_load, setQuestion_1_load] = React.useState<LoadStatesType>('INITIAL');
  let [question_2_load, setQuestion_2_load] = React.useState<LoadStatesType>('INITIAL');
  let [question_3_load, setQuestion_3_load] = React.useState<LoadStatesType>('INITIAL');
  let [question_4_load, setQuestion_4_load] = React.useState<LoadStatesType>('INITIAL');
  let [question_5_load, setQuestion_5_load] = React.useState<LoadStatesType>('INITIAL');
  let [question_6_load, setQuestion_6_load] = React.useState<LoadStatesType>('INITIAL');
  let [question_7_load, setQuestion_7_load] = React.useState<LoadStatesType>('INITIAL');
  let [question_8_load, setQuestion_8_load] = React.useState<LoadStatesType>('INITIAL');
  let [question_9_load, setQuestion_9_load] = React.useState<LoadStatesType>('INITIAL');
  let [question_10_load, setQuestion_10_load] = React.useState<LoadStatesType>('INITIAL');
  let [question_11_load, setQuestion_11_load] = React.useState<LoadStatesType>('INITIAL');
  let [question_12_load, setQuestion_12_load] = React.useState<LoadStatesType>('INITIAL');
  let [question_13_load, setQuestion_13_load] = React.useState<LoadStatesType>('INITIAL');
  let [question_14_load, setQuestion_14_load] = React.useState<LoadStatesType>('INITIAL');

  let fetchData = (userId: string) => {
    // question_1
    setQuestion_1_load('LOADING')
    http.post(userId, 'question_1', startDate, endDate)
      .then(withoutDuplicates)
      .then(setQuestion_1_data)
      .then(() => setQuestion_1_load('COMPLETED'))
      .catch((err) => {
        setQuestion_1_load('FAILED');
        console.error(err)
      })

    // question_2
    setQuestion_2_load('LOADING');
    http.post(userId, 'question_2', startDate, endDate)
      .then(withoutDuplicates)
      .then(setQuestion_2_data)
      .then(() => setQuestion_2_load('COMPLETED'))
      .catch((err) => {
        setQuestion_2_load('FAILED');
        console.error(err)
      })

    // question_3
    setQuestion_3_load('LOADING');
    http.post(userId, 'question_3', startDate, endDate)
      .then(withoutDuplicates)
      .then(setQuestion_3_data)
      .then(() => setQuestion_3_load('COMPLETED'))
      .catch((err) => {
        setQuestion_3_load('FAILED');
        console.error(err)
      })

    // question_4
    setQuestion_4_load('LOADING');
    http.post(userId, 'question_4', startDate, endDate)
      .then(withoutDuplicates)
      .then(setQuestion_4_data)
      .then(() => setQuestion_4_load('COMPLETED'))
      .catch((err) => {
        setQuestion_4_load('FAILED');
        console.error(err)
      })

    // question_5
    setQuestion_5_load('LOADING');
    http.post(userId, 'question_5', startDate, endDate)
      .then(withoutDuplicates)
      .then(setQuestion_5_data)
      .then(() => setQuestion_5_load('COMPLETED'))
      .catch((err) => {
        setQuestion_5_load('FAILED');
        console.error(err)
      })

    // question_6
    setQuestion_6_load('LOADING');
    http.post(userId, 'question_6', startDate, endDate)
      .then(withoutDuplicates)
      .then(setQuestion_6_data)
      .then(() => setQuestion_6_load('COMPLETED'))
      .catch((err) => {
        setQuestion_6_load('FAILED');
        console.error(err)
      })

    // question_7
    setQuestion_7_load('LOADING');
    http.post(userId, 'question_7', startDate, endDate)
      .then(withoutDuplicates)
      .then(setQuestion_7_data)
      .then(() => setQuestion_7_load('COMPLETED'))
      .catch((err) => {
        setQuestion_7_load('FAILED');
        console.error(err)
      })

    // question_8
    setQuestion_8_load('LOADING');
    http.post(userId, 'question_8', startDate, endDate)
      .then(withoutDuplicates)
      .then(setQuestion_8_data)
      .then(() => setQuestion_8_load('COMPLETED'))
      .catch((err) => {
        setQuestion_8_load('FAILED');
        console.error(err)
      })

    // question_9
    setQuestion_9_load('LOADING');
    http.post(userId, 'question_9', startDate, endDate)
      .then(withoutDuplicates)
      .then(setQuestion_9_data)
      .then(() => setQuestion_9_load('COMPLETED'))
      .catch((err) => {
        setQuestion_9_load('FAILED');
        console.error(err)
      })

    // question_10
    setQuestion_10_load('LOADING');
    http.post(userId, 'question_10', startDate, endDate)
      .then(withoutDuplicates)
      .then(setQuestion_10_data)
      .then(() => setQuestion_10_load('COMPLETED'))
      .catch((err) => {
        setQuestion_10_load('FAILED');
        console.error(err)
      })

    // question_11
    setQuestion_11_load('LOADING');
    http.post(userId, 'question_11', startDate, endDate)
      .then(withoutDuplicates)
      .then(setQuestion_11_data)
      .then(() => setQuestion_11_load('COMPLETED'))
      .catch((err) => {
        setQuestion_11_load('FAILED');
        console.error(err)
      })

    // question_12
    setQuestion_12_load('LOADING');
    http.post(userId, 'question_12', startDate, endDate)
      .then(withoutDuplicates)
      .then(setQuestion_12_data)
      .then(() => setQuestion_12_load('COMPLETED'))
      .catch((err) => {
        setQuestion_12_load('FAILED');
        console.error(err)
      })

    // question_13
    setQuestion_13_load('LOADING');
    http.post(userId, 'question_13', startDate, endDate)
      .then(withoutDuplicates)
      .then(setQuestion_13_data)
      .then(() => setQuestion_13_load('COMPLETED'))
      .catch((err) => {
        setQuestion_13_load('FAILED');
        console.error(err)
      })

    // question_14
    setQuestion_14_load('LOADING');
    http.post(userId, 'question_14', startDate, endDate)
      .then(withoutDuplicates)
      .then(setQuestion_14_data)
      .then(() => setQuestion_14_load('COMPLETED'))
      .catch((err) => {
        setQuestion_14_load('FAILED');
        console.error(err)
      })
  }

  
  const [isDoctor, setIsDoctor] = React.useState(false)

  React.useEffect(() => {
    http.getUsers(currentUser ?? '').then((users) => {
      if(users.length) {
        setIsDoctor(true)
        setUsers(users)
      }
    })
    
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    isDoctor
      ? window.location.hash = 'doctor'
      : window.location.hash = 'patient'
  }, [isDoctor])

  React.useEffect(() => {
    if (isDoctorPage()) {
      if (selectedUser) fetchData(selectedUser)
    } else {
      if (currentUser) fetchData(currentUser)
    }
    // eslint-disable-next-line
  }, [startDate, endDate, currentUser, selectedUser])

  return (
    <StoreContext.Provider
      value={{
        currentUser,
        selectedUser,
        setSelectedUser,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        users,
        setUsers,
        question_1_data,
        question_2_data,
        question_3_data,
        question_4_data,
        question_5_data,
        question_6_data,
        question_7_data,
        question_8_data,
        question_9_data,
        question_10_data,
        question_11_data,
        question_12_data,
        question_13_data,
        question_14_data,

        question_1_load,
        question_2_load,
        question_3_load,
        question_4_load,
        question_5_load,
        question_6_load,
        question_7_load,
        question_8_load,
        question_9_load,
        question_10_load,
        question_11_load,
        question_12_load,
        question_13_load,
        question_14_load,
        isDoctor, 
        setIsDoctor
      }}>
      {children}
    </StoreContext.Provider>
  );
};