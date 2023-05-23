import React from 'react';
import './App.css';
import Charts from './components/charts';

function App() {
  
  return (
    <div className="App">
      {/* 
      <Charts.SleepQuality />
      <Charts.SleepEfficiency /> */}
      <Charts.TimeInBed />
      <Charts.TakingSleepingPills />
      <Charts.AlcoholIntake />
      <Charts.PhysicalActivity />
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
