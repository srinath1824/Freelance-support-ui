import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";
require("dotenv").config();

function DeveloperConsultantGraph() {
  const [userData, setUserData] = useState();

  useEffect(() => {
    axios
      .get(
        `https://${process.env.REACT_APP_SERVER_URL}/api/fs/paymentdetails/getClientDashboradDetails`
      )
      .then((res) => {
        setUserData(res.data);
      });
  }, []);

  const data = userData?.map((a) => {
    return {
      name: a.clientName,
      client: a.earning,
      consultant: a.amountPaid,
    };
  });

  return (
    <BarChart
      width={800}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
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
