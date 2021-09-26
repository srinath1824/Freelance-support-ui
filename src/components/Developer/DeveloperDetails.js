import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeveloperDetailsDialog from "./DeveloperDetaisDialog";
import axios from "axios";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import DateFormat from "../DateFormat/dateFormt";
require("dotenv").config();

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  tableContainer: {
    height: "72vh",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  inputs: {
    margin: "10px",
    width: "100%",
  },
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
  },
  table: {
    minWidth: 650,
  },
  tableHeading: {
    backgroundColor: "lightGray",
  },
  tableRow: {
    "&:hover": {
      backgroundColor: "#f0eee7",
      cursor: "pointer",
    },
  },
  backdrop: {
    backgroundColor: "#deebe8",
  },
}));

function DeveloperDetails() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [dialogDetails, setDialogDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [developerDetailsData, setDeveloperDetailsData] = useState([]);

  const getDeveloperDetails = () => {
    setLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/api/fs/developer/getDeveloperDetails`
      )
      .then((res) => {
        setLoading(false);
        const rows = res.data.map((data) =>
          createData(
            data.developerName,
            data.technology,
            data.started,
            data.amount,
            data.experience,
            data.company,
            data.mobile,
            data.status,
            data._id
          )
        );
        setDeveloperDetailsData(rows);
      })
      .catch((err) => {
        setLoading(false);
        console.log("ERROR", err);
      });
  };

  useEffect(() => {
    getDeveloperDetails();
  }, []);

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
    setDialogDetails(row);
  };

  function createData(
    developerName,
    technology,
    started,
    amount,
    experience,
    company,
    mobile,
    status,
    id
  ) {
    return {
      developerName,
      technology,
      started,
      amount,
      experience,
      company,
      mobile,
      status,
      id,
    };
  }

  return (
    <>
      {loading ? (
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <>
          <div className={classes.root}>
            <Fab color="primary" variant="extended" onClick={handleClickOpen}>
              <AddIcon className={classes.extendedIcon} />
              Add Developer
            </Fab>
            <TableContainer
              className={classes.tableContainer}
              component={Paper}
            >
              <Table className={classes.table} aria-label="simple table">
                <TableHead className={classes.tableHeading}>
                  <TableRow>
                    <TableCell>Developer</TableCell>
                    <TableCell>Technology</TableCell>
                    <TableCell>Started</TableCell>
                    <TableCell>Amount&nbsp;(Rs.)</TableCell>
                    <TableCell>Experience</TableCell>
                    <TableCell>Company</TableCell>
                    <TableCell>Mobile</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {developerDetailsData.map((row) => (
                    <TableRow
                      key={row.name}
                      className={classes.tableRow}
                      onClick={() => handleRowClick(row)}
                    >
                      <TableCell>{row.developerName}</TableCell>
                      <TableCell>{row.technology}</TableCell>
                      <TableCell>{DateFormat(row.started)}</TableCell>
                      <TableCell>{row.amount}</TableCell>
                      <TableCell>{row.experience}</TableCell>
                      <TableCell>{row.company}</TableCell>
                      <TableCell>{row.mobile}</TableCell>
                      <TableCell
                        style={{
                          color: row.status === "Active" ? "darkgreen" : "red",
                          // display: "flex"
                          fontWeight: "bold",
                        }}
                      >
                        {/* <FiberManualRecordIcon
                          fontSize="small"
                          style={{
                            color:
                              row.status === "Active" ? "darkgreen" : "red",
                          }}
                        ></FiberManualRecordIcon> */}
                        <span style={{ marginLeft: "5px" }}>{row.status}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <DeveloperDetailsDialog
            open={open}
            handleClose={handleClose}
            developerDetailsData={developerDetailsData}
            setDeveloperDetailsData={setDeveloperDetailsData}
            dialogDetails={dialogDetails}
            showDelete={showDelete}
            getDeveloperDetails={getDeveloperDetails}
          />
        </>
      )}
    </>
  );
}

export default DeveloperDetails;
