import React, { FunctionComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList
} from "recharts";

const data = [
  {
    name: "Jan 21",
    saving: 4000,
    earning: 2400,
  },
  {
    name: "Feb 21",
    saving: 3000,
    earning: 1398,
  },
  {
    name: "Mar 21",
    saving: 2000,
    earning: 9800,
  },
  {
    name: "Apr 21",
    saving: 2780,
    earning: 3908,
  },
  {
    name: "May 21",
    saving: 1890,
    earning: 4800,
  },
  {
    name: "Jun 21",
    saving: 2390,
    earning: 3800,
  },
  {
    name: "July 21",
    saving: 3490,
    earning: 4300,
  }
];

const CustomizedLabel = (props) => {
  const { x, y, stroke, value } = props;

  return (
    <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
      {value}
    </text>
  );
};

const CustomizedAxisTick = (props) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
      >
        {payload.value}
      </text>
    </g>
  );
};

export default function DashboardChart() {
  return (
    <LineChart
      width={800}
      height={300}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 10
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" height={60} tick={<CustomizedAxisTick />} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="earning" stroke="#8884d8">
        <LabelList content={<CustomizedLabel />} />
      </Line>
      <Line type="monotone" dataKey="saving" stroke="#82ca9d" />
    </LineChart>
  );
}
