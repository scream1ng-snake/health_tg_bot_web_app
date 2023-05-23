import React from 'react';
import './PhysicalActivity.css';
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";

const RADIAN = Math.PI / 180;

const data02 = [
  { name: "Моя актвиность за неделю", value: 150, color: '#0088FE' },
  { name: "Оставшаяся активность за неделю", value: 150, color: '#FF8042' },
];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      dominantBaseline="central"
      textAnchor={x > cx ? "start" : "end"}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PhysicalActivity: React.FC = () => {
  return (
    <>
      <h3>Физическая нагрузка</h3>
      <PieChart width={1000} height={400}>
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
    </>
  );
}

export default PhysicalActivity;