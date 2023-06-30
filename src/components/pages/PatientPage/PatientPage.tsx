import React from 'react';
import useTelegram from '../../../hooks/useTelegram';
import Charts from '../../charts';
import './PatientPage.css';
export const PatientPage: React.FC = () => {
  const { username } = useTelegram();
  return (
    <>
      <h3 className='hint'>
        {username?.length
          ? `Результаты пользователя: '${username}'`
          : 'Не удалось получить пользователя телеграмм'
        }
      </h3>
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
  )
}