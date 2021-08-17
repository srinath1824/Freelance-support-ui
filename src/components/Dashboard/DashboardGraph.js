import React, { useState, useEffect, FunctionComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";
import axios from "axios";
require("dotenv").config();

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
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(`https://${process.env.REACT_APP_SERVER_URL}/api/fs/paymentdetails/getPaymentDetails`)
      .then((res) => {
        setData(res.data);
      });
  }, []);
  return (
    <LineChart
      width={800}
      height={300}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 10,
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
