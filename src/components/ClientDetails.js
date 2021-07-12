import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ClientDetailsDialog from "./ClientDetailsDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  inputs: {
    margin: '10px',
    width: '100%'
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%'
  },
  table: {
    minWidth: 650,
  },
  tableHeading: {
    backgroundColor: 'lightGray',
  },
  tableRow: {
    '&:hover': {
      backgroundColor: '#f0eee7',
      cursor: 'pointer'
    }
  }
}));

function ClientDetails() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [showDelete, setShowDelete] = React.useState(false);
  const [dialogDetails, setDialogDetails] = React.useState({});

  const handleClickOpen = () => {
    setOpen(true);
    setShowDelete(false);
    setDialogDetails({});
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRowClick = (row) => {
    setOpen(true);
    setShowDelete(true);
    setDialogDetails(row)
  }

  function createData(client, technology, started, amount, status) {
    return { client, technology, started, amount, status };
  }

  const DashboardData = [
    { client: "Bala", technology: "Reactjs", started: "14/05/2021", amount: "700", status: "Active" },
    { client: "Niharika", technology: "Reactjs", started: "03/06/2021", amount: "600", status: "Active" },
    { client: "Sanjana", technology: "Reactjs", started: "24/01/2021", amount: "650", status: "Active" },
    { client: "Om Prakash", technology: "Angular", started: "18/06/2021", amount: "800", status: "Active" },
    { client: "Mounika", technology: "Reactjs", started: "07/07/2021", amount: "700", status: "Active" },
    { client: "Venkat", technology: "Angular", started: "09/07/2021", amount: "700", status: "Active" },
  ];

  const rows = DashboardData.map(data => createData(data.client, data.technology, data.started, data.amount, data.status))


  return (
    <>
      <div className={classes.root}>
        <Fab color="primary" variant="extended" onClick={handleClickOpen}>
          <AddIcon className={classes.extendedIcon} />
            Add Client
        </Fab>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead className={classes.tableHeading}>
              <TableRow >
                <TableCell>Client</TableCell>
                <TableCell>Technology</TableCell>
                <TableCell>Started</TableCell>
                <TableCell>Amount&nbsp;($)</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name} className={classes.tableRow} onClick={() => handleRowClick(row)}>
                  <TableCell >
                    {row.client}
                  </TableCell>
                  <TableCell>{row.technology}</TableCell>
                  <TableCell>{row.started}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell style={{ color: row.status === "Active" ? "darkgreen" : 'red' }}>{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <ClientDetailsDialog open={open} handleClose={handleClose} dialogDetails={dialogDetails} setDialogDetails={setDialogDetails} showDelete={showDelete} />
    </>
  )
}

export default ClientDetails;