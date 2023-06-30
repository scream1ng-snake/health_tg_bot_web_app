import moment from 'moment';
import React from 'react';
import useTelegram from '../hooks/useTelegram';

type user = {id: string, name: string}

const getNow = () => moment(new Date())
  .format('YYYY-MM-DD')

const getOneWeekAgo = () => moment(new Date(Date.now() - (24 * 60 * 60 * 1000) * 7))
  .format('YYYY-MM-DD')

export const StoreContext = React.createContext({
  /** текущий пользователь телеги */
  currentUser: null as Optional<string>,
  users: [] as user[],
  setUsers: (users: user[]) => {},
  /** просматриваемый пользователь */
  selectedUser: null as Optional<string>,
  setSelectedUser: (user: string) => { },
  /** начальная дата */
  startDate: getOneWeekAgo(),
  setStartDate: (date: string) => { },
  /** конечная дата */
  endDate: getNow(),
  setEndDate: (date: string) => { },
});


export const StoreProvider = ({ children }: {
  children: React.ReactNode
}) => {
  const [currentUser] = React.useState<Optional<string>>(useTelegram().user_id);
  const [selectedUser, setSelectedUser] = React.useState('');

  const now = getNow()
  const oneWeekAgo = getOneWeekAgo()
  
  const [startDate, setStartDate] = React.useState(oneWeekAgo);
  const [endDate, setEndDate] = React.useState(now);

  const [users, setUsers] = React.useState<user[]>([]);



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
        setUsers
      }}>
      {children}
    </StoreContext.Provider>
  );
};