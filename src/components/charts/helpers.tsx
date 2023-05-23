export const RADIAN = Math.PI / 180;

/**
 * Метка внутри пирожка
 * @param param0 
 * @returns 
 */
export const renderCustomizedLabel = ({
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