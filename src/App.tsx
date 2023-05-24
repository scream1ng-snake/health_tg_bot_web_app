import React from 'react';
import './App.css';
import Charts from './components/charts';

function App() {
  
  return (
    <div className="App">
      {/* 
      
      <Charts.SleepEfficiency /> */}
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
    </div>
  );
}

export default App;
