import React from 'react';
import './App.css';
import Charts from './components/charts';

type DaytimeSleep = unknown;
const daytimeSleepData: Array<DaytimeSleep> = []

function App() {
  
  return (
    <div className="App">
      {/* <Charts.TimeInBed />
      <Charts.SleepQuality />
      <Charts.AlcoholIntake />
      <Charts.SleepEfficiency />
      <Charts.PhysicalActivity />
      <Charts.TakingSleepingPills /> */}
      <Charts.DurationOfDaytimeSleep/>
      {/* <Charts.DurationOfFallingAsleep />
      <Charts.TheNumberOfNightAwakenings />
      <Charts.TimeSpentInBedAfterWakingUp />
      <Charts.TheTotalDurationOfNightAwakenings />
      <Charts.DynamicsOfSleepDurationAndStayingInBed /> */}
    </div>
  );
}

export default App;
