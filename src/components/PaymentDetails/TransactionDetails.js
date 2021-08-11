import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { getClientDetailsApi, getDeveloperDetailsApi } from "../ApiCalls";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import DateFormat from "../DateFormat/dateFormt";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
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
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  thirdHeading: {
    fontSize: theme.typography.pxToRem(15),
    flexShrink: 0,
  },
  tableText: {
    display: "flex",
    justifyContent: "center",
  },
}));

function TransactionDetails() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [clientPaymentDetails, setClientPaymentDetails] = useState([]);
  const [developerPaymentDetails, setDeveloperPaymentDetails] = useState([]);

  useEffect(() => {
    setLoading(true);
    Promise.allSettled([getClientDetailsApi(), getDeveloperDetailsApi()])
      .then((res) => {
        res.map((response) => {
          if (response.value.id === "clientDetails") {
            setClientPaymentDetails(response.value.data);
          } else if (response.value.id === "developerDetails") {
            setDeveloperPaymentDetails(response.value.data);
          }
        });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);
  return (
    <Grid container>
      {loading ? (
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <>
          <Grid item xs={12}>
            <>
              <h3 className={classes.title}>Client Transaction Details</h3>
            </>
            <div className={classes.root}>
              {clientPaymentDetails.map((row) => (
                <>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <Accordion expanded={row.id}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
                          <h1 className={classes.heading}>{row.clientName}</h1>
                          <h2 className={classes.secondaryHeading}>
                            {row.technology}
                          </h2>
                          <h3
                            className={classes.thirdHeading}
                            style={{
                              color:
                                row.status === "Active" ? "darkgreen" : "red",
                            }}
                          >
                            {row.status}
                          </h3>
                        </AccordionSummary>
                        <AccordionDetails>
                          {row.paymentDetails.length ? (
                            <TableContainer component={Paper}>
                              <Table
                                className={classes.table}
                                aria-label="simple table"
                              >
                                <TableHead className={classes.tableHeading}>
                                  <TableRow>
                                    <TableCell>Amount Paid</TableCell>
                                    <TableCell>Credit Account</TableCell>
                                    <TableCell>Date Paid</TableCell>
                                    <TableCell>Paid Month</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {row.paymentDetails.map((val) => (
                                    <TableRow
                                      key={row._id}
                                      className={classes.tableRow}
                                    >
                                      <>
                                        <TableCell>
                                          {val.amountPaid ?? "N/A"}
                                        </TableCell>
                                        <TableCell>
                                          {val.creditAccount ?? "N/A"}
                                        </TableCell>
                                        <TableCell>
                                          {DateFormat(val.datePaid) ?? "N/A"}
                                        </TableCell>
                                        <TableCell>
                                          {val.paidForMonth ?? "N/A"}
                                        </TableCell>
                                      </>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          ) : (
                            <h3 className={classes.tableText}>
                              No Transaction as of now
                            </h3>
                          )}
                        </AccordionDetails>
                      </Accordion>
                    </Table>
                  </TableContainer>
                </>
              ))}
            </div>
          </Grid>

          <Grid item xs={12}>
            <>
              <h3 className={classes.title}>Developer Transaction Details</h3>
            </>
            <div className={classes.root}>
              {developerPaymentDetails.map((row) => (
                <>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <Accordion expanded={row.id}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
                          <h1 className={classes.heading}>
                            {row.developerName}
                          </h1>
                          <h2 className={classes.secondaryHeading}>
                            {row.technology}
                          </h2>
                          <h3
                            className={classes.thirdHeading}
                            style={{
                              color:
                                row.status === "Active" ? "darkgreen" : "red",
                            }}
                          >
                            {row.status}
                          </h3>
                        </AccordionSummary>
                        <AccordionDetails>
                          {row.paymentDetails.length ? (
                            <TableContainer component={Paper}>
                              <Table
                                className={classes.table}
                                aria-label="simple table"
                              >
                                <TableHead className={classes.tableHeading}>
                                  <TableRow>
                                    <TableCell>Amount Paid</TableCell>
                                    <TableCell>Credit Account</TableCell>
                                    <TableCell>Date Paid</TableCell>
                                    <TableCell>Paid Month</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {row.paymentDetails.map((val) => (
                                    <TableRow
                                      key={row._id}
                                      className={classes.tableRow}
                                    >
                                      <>
                                        <TableCell>
                                          {val.amountPaid ?? "N/A"}
                                        </TableCell>
                                        <TableCell>
                                          {val.creditAccount ?? "N/A"}
                                        </TableCell>
                                        <TableCell>
                                          {DateFormat(val.datePaid) ?? "N/A"}
                                        </TableCell>
                                        <TableCell>
                                          {val.paidForMonth ?? "N/A"}
                                        </TableCell>
                                      </>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          ) : (
                            <h3 className={classes.tableText}>
                              No Transaction as of now
                            </h3>
                          )}
                        </AccordionDetails>
                      </Accordion>
                    </Table>
                  </TableContainer>
                </>
              ))}
            </div>
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default TransactionDetails;
