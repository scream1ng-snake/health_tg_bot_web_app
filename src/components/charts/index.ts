import AlcoholIntake from './AlcoholIntake/AlcoholIntake';
import DurationOfDaytimeSleep from './DurationOfDaytimeSleep/DurationOfDaytimeSleep';
import DurationOfFallingAsleep from './DurationOfFallingAsleep/DurationOfFallingAsleep';
import DynamicsOfSleepDurationAndStayingInBed from './DynamicsOfSleepDurationAndStayingInBed/DynamicsOfSleepDurationAndStayingInBed';
import PhysicalActivity from './PhysicalActivity/PhysicalActivity';
import SleepEfficiency from './SleepEfficiency/SleepEfficiency';
import SleepQuality from './SleepQuality/SleepQuality';
import TakingSleepingPills from './TakingSleepingPills/TakingSleepingPills';
import TheNumberOfNightAwakenings from './TheNumberOfNightAwakenings/TheNumberOfNightAwakenings';
import TheTotalDurationOfNightAwakenings from './TheTotalDurationOfNightAwakenings/TheTotalDurationOfNightAwakenings';
import TimeInBed from './TimeInBed/TimeInBed';
import TimeSpentInBedAfterWakingUp from './TimeSpentInBedAfterWakingUp/TimeSpentInBedAfterWakingUp';


const Charts = {
  DurationOfDaytimeSleep: DurationOfDaytimeSleep, // 1
  PhysicalActivity: PhysicalActivity, // 2
  AlcoholIntake: AlcoholIntake, // 4
  TakingSleepingPills: TakingSleepingPills, // 5
  TimeInBed: TimeInBed, // 6
  DurationOfFallingAsleep: DurationOfFallingAsleep, // 8
  TheNumberOfNightAwakenings: TheNumberOfNightAwakenings,
  TheTotalDurationOfNightAwakenings: TheTotalDurationOfNightAwakenings,
  TimeSpentInBedAfterWakingUp: TimeSpentInBedAfterWakingUp,
  DynamicsOfSleepDurationAndStayingInBed: DynamicsOfSleepDurationAndStayingInBed,
  SleepQuality: SleepQuality,
  SleepEfficiency: SleepEfficiency,
}

export default Charts;