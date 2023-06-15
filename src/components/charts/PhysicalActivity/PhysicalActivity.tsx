import React from 'react';
import './PhysicalActivity.css';
import { PieChart, Pie, Legend, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { renderCustomizedLabel } from '../helpers';
import { http, LastWeek, NotEnoughtData, prepareDate } from '../../common';


const layout = {
  width: '80%',
  height: 300
}

/**
 * Физическая нагрузка за неделю
 * физическая нагрузка, цель: 150 минут в неделю (общая продолжительность за неделю). 
 * Пирожковая диаграмма: 150 минут - 100% 
 * @returns 
 */
const PhysicalActivity: React.FC = () => {
  const [data, setData] = React.useState<answer[]>([]);
  /** Недостаточно данных */
  const isNotEnought = !data.length;

  React.useEffect(() => {
    http.post('question_2')
      .then(LastWeek)
      .then(prepareDate)
      .then(setData)
      .catch(console.log)
  }, [])

  const physicalActivity = data.reduce((acc, cur) => (
    acc + Number(cur.answer_text)
  ), 0)

  const data02 = [
    { 
      name: "Моя актвиность за неделю", 
      value: physicalActivity ?? 0, 
      color: '#0088FE' 
    },
    { 
      name: "Оставшаяся активность за неделю", 
      value: 150 - physicalActivity ?? 0, 
      color: '#FF8042' 
    },
  ];
  return (
    <div className='responsiveChart'>
      <h3>Физическая нагрузка за неделю</h3>
      {isNotEnought ? <NotEnoughtData /> : null}
      <ResponsiveContainer {...layout}>
        <PieChart height={400}>
          <Pie
            fill="#8884d8"
            dataKey="value"
            data={data02}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            innerRadius={70}
          >
            {data02.map((entry, index) =>
              <Cell key={`cell-${index}`} fill={entry.color} />
            )}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PhysicalActivity;