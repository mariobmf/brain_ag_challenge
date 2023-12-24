'use client';
import { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  LegendProps,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from 'recharts';
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#E83743',
  '#91C843',
  '#7058E9',
  '#F6A30D',
  '#3DB7CC',
  '#F54EA2',
  '#5D3BFD',
  '#E17015',
  '#42C47E',
  '#B72BD3',
  '#F19C4F',
  '#2972E0',
  '#E94C88',
  '#6ABD2C',
  '#CC54F1',
  '#66A436',
  '#E54F83',
  '#38A2DB',
  '#E0BB2F',
  '#8F31D9',
  '#F05F32',
  '#529E46',
  '#AF3DAA',
  '#72C2F0',
  '#E5295C',
  '#9ECA38',
  '#5252C8',
  '#E89E2A',
  '#48ACD6',
  '#E94571',
  '#93CA56',
  '#4B53E7',
  '#D3A349',
  '#4A90E3',
  '#FF753B',
  '#56A94E',
  '#A74DE4',
  '#D5B627',
  '#8A3DC4',
  '#E58A45',
  '#3F8C5E',
  '#C637A6',
  '#75A244',
  '#DA3C78',
  '#5FAE3A',
  '#E3429D',
  '#7EC164',
  '#B02B7A',
  '#57C690',
  '#E03369',
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

interface BulletProps {
  backgroundColor: string;
}

const Bullet = ({ backgroundColor }: BulletProps) => {
  return (
    <div
      className="h-3 w-3 rounded-full"
      style={{
        backgroundColor,
      }}
    ></div>
  );
};

const CustomizedLegend = (props: LegendProps) => {
  const { payload } = props;

  return payload ? (
    <ul className="flex list-none flex-wrap items-center justify-center gap-3">
      {payload.map((item, index) => (
        <li key={`item-${index}`}>
          <div className="flex items-center gap-2">
            {item.color && <Bullet backgroundColor={item.color} />}
            <p className="text-base font-medium text-zinc-700">{item.value}</p>
          </div>
        </li>
      ))}
    </ul>
  ) : null;
};

const CustomizedTooltip = (props: TooltipProps<ValueType, NameType>) => {
  const { payload } = props;
  return payload ? (
    <div className="flex flex-col gap-1 rounded-sm bg-slate-100 p-3 text-zinc-700 shadow-md">
      <p className="text-lg font-bold">{payload[0]?.name}</p>
      <p className="text-base font-medium">Quantidade: {payload[0]?.value}</p>
    </div>
  ) : null;
};

interface PieChartComponentProps {
  title?: string;
  data: {
    name: string;
    value: number;
  }[];
}

export function PieChartComponent({ title, data }: PieChartComponentProps) {
  const id = Date.now().toString();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  return isMounted ? (
    <div className="flex min-h-[250px] w-full flex-col items-center">
      {title && <h2>{title}</h2>}

      <ResponsiveContainer>
        <PieChart>
          <Pie
            id={id}
            data={data}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend
            content={<CustomizedLegend />}
            verticalAlign="top"
            align="center"
          />
          <Tooltip content={<CustomizedTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  ) : null;
}
