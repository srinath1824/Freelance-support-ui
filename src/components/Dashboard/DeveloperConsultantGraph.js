import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data = [
  {
    name: "Bala",
    client: 50000,
    consultant: 50000
  },
  {
    name: "Niharika",
    client: 47000,
    consultant: 15000
  },
  {
    name: "Sanjana",
    client: 47000,
    consultant: 9000
  },
  {
    name: "Om Prakesh",
    client: 56000,
    consultant: 26000
  },
  {
    name: "Mounika",
    client: 47000,
    consultant: 12000
  },
  {
    name: "Venkat",
    client: 50000,
    consultant: 20000,
  }
];

function DeveloperConsultantGraph() {
  return (
    <BarChart
      width={800}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="client" fill="#8884d8" />
      <Bar dataKey="consultant" fill="#82ca9d" />
    </BarChart>
  );
}

export default DeveloperConsultantGraph;