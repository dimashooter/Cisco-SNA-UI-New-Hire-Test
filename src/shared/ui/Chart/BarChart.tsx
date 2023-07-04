import {
  BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Cell,
} from 'recharts';
import { useMemo } from 'react';
import { User } from '../../../app/types/types';

interface BarChartProps {
  data: User[]
}

const COLORS = ['#82ca9d', '#8884d8'];

export const BarChartComponent = ({ data }: BarChartProps) => {
  const memoizedData = useMemo(
    () => {
      const users = data.reduce((acc: { [key: string]: number }, user: User) => {
        if (!user.gender) return acc;
        acc[user.gender] = (acc[user.gender] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(users).map(([name, count]) => ({ name, count }));
    },
    [data],
  );

  return (
    <BarChart
      width={370}
      height={300}
      data={memoizedData}
      margin={{
        top: 25,
        right: 10,
        left: 10,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" fill="#8884d8" label={{ position: 'top' }}>
        {memoizedData.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
      </Bar>
    </BarChart>
  );
};
