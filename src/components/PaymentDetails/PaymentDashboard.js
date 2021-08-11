import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { getClientDetailsApi, getDeveloperDetailsApi } from "../ApiCalls";
import Dialog from "../Dialog/Dialog";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  inputs: {
    margin: "10px",
    width: "100%",
  },
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  button: {
    margin: "0.5rem",
  },
  title: {
    marginLeft: "12px",
  },
  tableHeading: {
    textAlign: "center",
  },
  backdrop: {
    backgroundColor: "#deebe8",
  },
  button: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "8px",
  },
}));

function PaymentDashboard() {
  const classes = useStyles();
  const [user, setUser] = useState("");
  const [details, setDetails] = useState({
    amountPaid: "",
    datePaid: "",
    creditAccount: "",
    paidForMonth: "",
  });
  const [error, setError] = useState({
    amountPaid: false,
    datePaid: false,
    creditAccount: false,
    paidForMonth: false,
  });

  const [clientPaymentDetails, setClientPaymentDetails] = useState([]);
  const [developerPaymentDetails, setDeveloperPaymentDetails] = useState([]);
  const [paymentId, setPaymenId] = useState();
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [dialog, setDialog] = useState(false);

  const paymentDetailsData = [
    { id: "1", name: "Client" },
    { id: "2", name: "Developer" },
  ];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

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

  const selectFiledChange = (e) => {
    setUser(e.target.value);
  };
  const handleSelectChange = (e) => {
    if (user === "Client") {
      setPaymenId(e.target.value);
    } else if (user === "Developer") {
      setPaymenId(e.target.value);
    }
    setIsDisabled(false);
  };

  const handleInputChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const validation = () => {
    let errs = { ...error };
    if (Object.keys(details).length === 0) {
      for (let i in error) {
        errs[i] = true;
      }
    } else {
      for (let i in details) {
        if (details[i] === "" || details[i] === undefined) {
          errs[i] = true;
        } else {
          errs[i] = false;
        }
      }
    }
    setError(errs);
    for (let i in errs) {
      if (errs[i]) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (value) => {
    const valid = validation();
    setDialog(true);
    if (valid) {
      setLoading(true);
      try {
        if (user === "Client") {
          axios
            .put(
              `http://localhost:4000/api/fs/client/clientPaymentDetails/${paymentId}`,
              details
            )
            .then((res) => {
              setLoading(false);
              setDetails({
                ...details,
                [value.name]: "",
              });
            })
            .catch((err) => {
              console.log("ERROR", err);
              setLoading(false);
            });
        } else if (user === "Developer") {
          axios
            .put(
              `http://localhost:4000/api/fs/developer/developerPaymentDetails/${paymentId}`,
              details
            )
            .then((res) => {
              setLoading(false);
            })
            .catch((err) => {
              console.log("ERROR", err);
              setLoading(false);
            });
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setUser("");
    setDetails({
      amountPaid: "",
      datePaid: "",
      creditAccount: "",
      paidForMonth: "",
    });
  };

  return (
    <>
      {loading ? (
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={4} />
          <Grid item xs={4}>
            <Grid item xs={12}>
              <h3 className={classes.title}>Payments</h3>
              <Grid container>
                <Grid item xs={12}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Select User
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      name="user"
                      value={user}
                      label="Select Client"
                      onChange={(e) => selectFiledChange(e)}
                    >
                      {paymentDetailsData.map((data) => {
                        return (
                          <MenuItem value={data.name}>{data.name}</MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  {user && (
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        {user === "Client"
                          ? "Select Client"
                          : user === "Developer"
                          ? "Select Developer"
                          : "Select User"}
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        name="user"
                        // value={user}
                        label="Select Client"
                        onChange={(e) => handleSelectChange(e)}
                      >
                        {user === "Client"
                          ? clientPaymentDetails.map((data) => {
                              return (
                                <MenuItem value={data._id}>
                                  {data.clientName}
                                </MenuItem>
                              );
                            })
                          : developerPaymentDetails.map((data) => {
                              return (
                                <MenuItem value={data._id}>
                                  {data.developerName}
                                </MenuItem>
                              );
                            })}
                      </Select>
                    </FormControl>
                  )}
                  <TextField
                    name="amountPaid"
                    className={classes.inputs}
                    onChange={handleInputChange}
                    type="number"
                    id="outlined-basic"
                    label="Amount"
                    variant="outlined"
                    value={details.amountPaid}
                    error={error.amountPaid}
                  />
                  <TextField
                    name="datePaid"
                    InputLabelProps={{ shrink: true }}
                    className={classes.inputs}
                    onChange={handleInputChange}
                    type="date"
                    id="outlined-basic"
                    label="PaymentDate"
                    variant="outlined"
                    value={details.datePaid}
                    error={error.datePaid}
                  />
                  <TextField
                    name="creditAccount"
                    className={classes.inputs}
                    onChange={handleInputChange}
                    type="text"
                    id="outlined-basic"
                    label="AccountHolder"
                    variant="outlined"
                    value={details.creditAccount}
                    error={error.creditAccount}
                  />
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Payment Month
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      name="paidForMonth"
                      label="Select Client"
                      value={details.paidForMonth}
                      onChange={handleInputChange}
                    >
                      {months.map((data) => {
                        return <MenuItem value={data}>{data}</MenuItem>;
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <div className={classes.button}>
                    <Button onClick={handleCancel} variant="contained">
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={isDisabled}
                      onClick={(value) => handleSubmit(value)}
                    >
                      Submit
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4} />
        </Grid>
      )}
      {dialog && (
        <Dialog
          title="Payment Conformation"
          profile={user}
          amount={details.amountPaid}
          paymentDate={details.datePaid}
          accountHolder={details.creditAccount}
          paidForMonth={details.paidForMonth}
        />
      )}
    </>
  );
}

export default PaymentDashboard;
