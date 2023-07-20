import React from 'react';
import { useStore } from '../../../hooks';
// import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ZAxis, Line, LineChart } from 'recharts';
import Charts from '../../charts';
import { DateInput, Select } from '../../common';
import './DoctorPage.css';

// тестовый трехмерный чарт

// const data: Array<{
//   date: string,
//   durationDaySleep: number,
//   durationNightSleep: number
// }> = [
//     {
//       date: '11.06.2022',
//       durationDaySleep: 60,
//       durationNightSleep: 90,
//     },
//     {
//       date: '12.06.2022',
//       durationDaySleep: 40,
//       durationNightSleep: 30,
//     },
//     {
//       date: '13.06.2022',
//       durationDaySleep: 70,
//       durationNightSleep: 80,
//     },
//     {
//       date: '14.06.2022',
//       durationDaySleep: 100,
//       durationNightSleep: 10,
//     },
//     {
//       date: '15.06.2022',
//       durationDaySleep: 30,
//       durationNightSleep: 123,
//     }
//   ]

// function renderLines() {
//   let dynamic_array = [
//     {
//       color: 'green',
//       key: 'date',
//       label: 'Дата'
//     },
//     {
//       color: 'red',
//       key: 'durationDaySleep',
//       label: 'Дневной сон'
//     },
//     {
//       color: 'blue',
//       key: 'durationNightSleep',
//       label: 'Ночной сон'
//     },
//   ];
//   const lines = dynamic_array.map((value) => (
//     <Line
//       key={value.key}
//       name={value.label}
//       type="monotone"
//       dataKey={value.key}
//       stroke={value.color}
//       strokeWidth={2}
//     />
//   ));
//   return lines;
// }


// /**
//  * Testtest
//  * @returns 
//  */
// const Testtest: React.FC = () => {
//   const layout = {
//     width: '80%',
//     height: 200
//   }
//   return (
//     <div className='responsiveChart'>
//       <h3 className='subtitle'>Тестовый трехмерный чарт</h3>
//       <ResponsiveContainer {...layout}>
//         <LineChart width={500} height={300} data={data}>
//           <XAxis dataKey="durationDaySleep" />
//           <YAxis dataKey='durationNightSleep'/>
//           <Tooltip />
//           <Legend />
//           <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
//           {renderLines()}
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   )
// };






export const DoctorPage: React.FC = () => {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    users,
    selectedUser,
    setSelectedUser
  } = useStore()

  
  return (
    <div>
      <h3 className='hint'>
        {selectedUser?.length
          ? `Результаты пользователя: '${selectedUser}'`
          : 'Выберите пользователя'
        }
      </h3>

      <div className='inputBar'>
        <Select
          data={users}
          selected={selectedUser ?? ''}
          onSelect={(name: string) => setSelectedUser(name)}
          placeholder='Выберите пользователя'
          name='select_user'
          label='Выберите пользователя'
        />
        <DateInput
          value={startDate}
          onChange={(date) => setStartDate(date)}
          label='Начальная дата'
          name='startDate'
        />
        <DateInput
          value={endDate}
          onChange={(date) => setEndDate(date)}
          label='Конечная дата'
          name='endDate'
        />
      </div>
      {selectedUser &&
        <>
          <Charts.DurationOfDaytimeSleep />
          <Charts.PhysicalActivity />
          <Charts.AlcoholIntake />
          <Charts.TakingSleepingPills />
          <Charts.TimeInBed />
          <Charts.DurationOfFallingAsleep />
          <Charts.TheNumberOfNightAwakenings />
          <Charts.TheTotalDurationOfNightAwakenings />
          <Charts.TimeSpentInBedAfterWakingUp />
          <Charts.DynamicsOfSleepDurationAndStayingInBed />
          <Charts.SleepQuality />
          <Charts.SleepEfficiency />
        </>
      }
    </div>
  )
}