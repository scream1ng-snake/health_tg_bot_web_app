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
  // question_1 - 1. Спали ли Вы вчера днем? (Длительность в минутах)
  DurationOfDaytimeSleep: DurationOfDaytimeSleep, // done

  // question_2 - Занимались ли Вы вчера спортом? (Длительность в минутах)
  PhysicalActivity: PhysicalActivity, // done

  // question_4 - Принимали ли Вы вчера алкоголь? (да/нет)
  AlcoholIntake: AlcoholIntake, // done

  // question_5 - Принимали ли Вы перед сном снотворное? (да/нет)
  TakingSleepingPills: TakingSleepingPills, // done

  // question_6 question_12 время между ними
  TimeInBed: TimeInBed, // done

  // question_8 - Сколько времени Вы потратили на то, чтобы уснуть? (Длительность в минутах)
  DurationOfFallingAsleep: DurationOfFallingAsleep, // done

  // question_9 - Сколько раз Вы просыпались среди ночи, не считая утреннего пробуждения?
  TheNumberOfNightAwakenings: TheNumberOfNightAwakenings, // done

  // question_10 - Сколько по ощущениям суммарно по времени составили Ваши ночные пробуждения? (Длительность в минутах)
  TheTotalDurationOfNightAwakenings: TheTotalDurationOfNightAwakenings, // done

  // question_11 & question_12 посчитать время между ними
  TimeSpentInBedAfterWakingUp: TimeSpentInBedAfterWakingUp, // done

  // question_6 question_12 это время нахождения в кровати
  // question_7 question_11 это время сна
  // посчитать время сна и нахождения в постели и показать на графике
  DynamicsOfSleepDurationAndStayingInBed: DynamicsOfSleepDurationAndStayingInBed, // done

  // question_14 - Оцените качество своего сна сегодня ночью? (от 1 до 5) ^(1|2|3|4|5)$
  SleepQuality: SleepQuality, // done

  // question_6 question_12 это время нахождения в кровати
  // question_7 question_11 это время сна
  // посчитать время сна и нахождения в постели 
  // посчитать эффективность сна
  SleepEfficiency: SleepEfficiency, // done
}

export default Charts;