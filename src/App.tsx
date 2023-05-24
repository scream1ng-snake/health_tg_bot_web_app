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
      <Charts.AlcoholIntake />
      <Charts.PhysicalActivity />
      <Charts.TakingSleepingPills />
      <Charts.DurationOfDaytimeSleep/>
      <Charts.DurationOfFallingAsleep />
      <Charts.TheNumberOfNightAwakenings />
      <Charts.TheTotalDurationOfNightAwakenings />
      <Charts.TimeSpentInBedAfterWakingUp />
      {/* 
      
      
      
      <Charts.DynamicsOfSleepDurationAndStayingInBed /> */}
    </div>
  );
}

export default App;
