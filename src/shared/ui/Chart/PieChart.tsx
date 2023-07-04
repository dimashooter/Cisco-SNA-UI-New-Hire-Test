import { memo, useMemo } from 'react';
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
} from 'recharts';
import { User } from '../../../app/types/types';

interface ChartProps {
  data: User[]
}

const COLORS = ['#0088fe', '#00c49F', '#ffBB28', '#ff8042', '#005541'];

export const Chart = memo(({ data }: ChartProps) => {
  const memoizedData = useMemo(
    () => {
      const users = data.reduce((acc: { [key: string]: number }, user: User) => {
        if (!user.jobTitle) return acc;
        acc[user.jobTitle] = (acc[user.jobTitle] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(users).map(([key, value]) => ({ key, value }));
    },
    [data],
  );

  return (
    <PieChart width={370} height={360} data-testId>
      <Pie
        dataKey="value"
        data={memoizedData}
        cx={200}
        cy={200}
        outerRadius={80}
        label

      >
        {memoizedData.map((el, idx) => (
          <Cell key={idx} fill={COLORS[idx]} name={el.key} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
});

Chart.displayName = 'Chart';
