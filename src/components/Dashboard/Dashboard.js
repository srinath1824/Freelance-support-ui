import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Graph from "./DashboardGraph";
import DeveloperConsultantGraph from "./DeveloperConsultantGraph";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableHeading: {
    backgroundColor: 'lightGray',
  }
});

function createData(client, developer, technology, started, amount, status) {
  return { client, developer, technology, started, amount, status };
}

const DashboardData = [
  {client: "Bala", developer: "Srinath", technology: "Reactjs", started: "14/05/2021", amount: "700", status: "Active"},
  {client: "Niharika", developer: "Srinath", technology: "Reactjs", started: "03/06/2021", amount: "600", status: "Active"},
  {client: "Sanjana", developer: "Sai", technology: "Reactjs", started: "24/01/2021", amount: "650", status: "Active"},
  {client: "Om Prakash", developer: "Santosh", technology: "Angular", started: "18/06/2021", amount: "800", status: "Active"},
  {client: "Mounika", developer: "Vara Prasad reddy", technology: "Reactjs", started: "07/07/2021", amount: "700", status: "Active"},
  {client: "Venkat", developer: "Manikanta", technology: "Angular", started: "09/07/2021", amount: "700", status: "Active"},
];

const rows = DashboardData.map(data => createData(data.client, data.developer, data.technology, data.started, data.amount, data.status))

export default function Dashboard() {
  const classes = useStyles();

  return (
    <>
    <Grid container>
      <Grid item xs={12} l={6} md={6} xl={6} >
        <Graph />
      </Grid>
      <Grid item xs={12} l={6} md={6} xl={6}>
        <DeveloperConsultantGraph />
      </Grid>
    </Grid>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.tableHeading}>
          <TableRow >
            <TableCell>Client</TableCell>
            <TableCell>Developer</TableCell>
            <TableCell>Technology</TableCell>
            <TableCell>Started</TableCell>
            <TableCell>Amount&nbsp;($)</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell >
                {row.client}
              </TableCell>
              <TableCell>{row.developer}</TableCell>
              <TableCell>{row.technology}</TableCell>
              <TableCell>{row.started}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell style={{ color: row.status === "Active" ? "darkgreen" : 'red' }}>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
