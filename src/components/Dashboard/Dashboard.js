import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Graph from "./DashboardGraph";
import DeveloperConsultantGraph from "./DeveloperConsultantGraph";
import axios from "axios";
import DateFormat from "../DateFormat/dateFormt";
require("dotenv").config();

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableHeading: {
    backgroundColor: "lightGray",
  },
});

export default function Dashboard() {
  const classes = useStyles();
  const [userTable, setUserTable] = useState();

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/api/fs/paymentdetails/getClientDashboradDetails`
      )
      .then((res) => {
        setUserTable(res.data);
      });
  }, []);

  return (
    <>
      <Grid container>
        <Grid item xs={12} l={6} md={6} xl={6}>
          <Graph />
        </Grid>
        <Grid item xs={12} l={6} md={6} xl={6}>
          <DeveloperConsultantGraph />
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableHeading}>
            <TableRow>
              <TableCell>Client</TableCell>
              <TableCell>Developer</TableCell>
              <TableCell>Technology</TableCell>
              <TableCell>Started</TableCell>
              <TableCell>Amount&nbsp;(Rs.)</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userTable?.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.clientName}</TableCell>
                <TableCell>{row.developerName}</TableCell>
                <TableCell>{row.technology}</TableCell>
                <TableCell>{DateFormat(row.startDate)}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell
                  style={{
                    color: row.status === "Active" ? "darkgreen" : "red",
                  }}
                >
                  {row.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
