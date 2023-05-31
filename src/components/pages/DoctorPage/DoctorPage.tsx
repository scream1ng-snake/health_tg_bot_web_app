import React from 'react';
import Charts from '../../charts';
import './DoctorPage.css';
export const DoctorPage: React.FC = () => {
  return(
    <div>
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
    </div>
  )
}