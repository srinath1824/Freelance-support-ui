import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import axios from "axios";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
require("dotenv").config();

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
  backdrop: {
    // backgroundColor: '#deebe8',
    zIndex: 1,
  },
}));

function ClientDetailsDialog({
  open,
  handleClose,
  showDelete,
  dialogDetails,
  clientDetailsData,
  setClientDetailsData,
  getClientDetails,
}) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    clientName: false,
    technology: false,
    amount: false,
    status: false,
    started: false,
  });
  const { clientName, technology, started, amount, status, id } = dialogDetails;
  const [addClient, setAddClient] = useState({ ...dialogDetails });

  const handleInputChange = (event) => {
    setAddClient({
      ...addClient,
      [event.target.name]: event.target.value,
    });
  };

  const validation = () => {
    let errs = {...error}
    if(Object.keys(addClient).length === 0) {
        for(let i in error) {
            errs[i] = true;
        }
    } else {
        for (let i in addClient) {
            if (addClient[i] === "" || addClient[i] === undefined) {
                errs[i] = true;
            } else {
                errs[i] = false;
            }
        }
    }
    setError(errs);
    for (let i in errs) {
        if(errs[i]) {
            return false;
        }
    }
    return true;
  };

  const handleSubmit = () => {
    const valid = validation();
    if(valid) {
        setLoading(true);
        if(Object.keys(dialogDetails).length === 0) {
          axios.post(`${process.env.REACT_APP_SERVER_URL}/api/fs/client/createClientDetails`, addClient)
            .then(res => {
                setLoading(false);
                setClientDetailsData([
                    ...clientDetailsData,
                    addClient
                ]);
                handleClose();
                getClientDetails();
            }).catch(err => {
                setLoading(false);
                console.log(err);
            })
        } else {
          axios.put(`${process.env.REACT_APP_SERVER_URL}/api/fs/client/updateClientDetails/${id}`, addClient)
        .then(res => {
            setLoading(false);
            setClientDetailsData([
                ...clientDetailsData,
                addClient
            ]);
            handleClose();
            getClientDetails();
        }).catch(err => {
            setLoading(false);
            console.log(err);
        })
        }
        }
  };

  const handleDeleteClick = () => {
    setLoading(true);
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/api/fs/client/deleteClientDetails/${id}`)
      .then((res) => {
        setLoading(false);
        const data = [...clientDetailsData];
        const index = clientDetailsData.findIndex((a) => a.id === id);
        data.splice(index, 1);
        setClientDetailsData(data);
        handleClose();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div>
      {loading ? (
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            <Grid container>
              <Grid item xs={10}>
                Add Client
              </Grid>
              <Grid item xs={2}>
                {showDelete && (
                  <Button
                    onClick={handleDeleteClick}
                    variant="outlined"
                    color="secondary"
                  >
                    Delete
                  </Button>
                )}
              </Grid>
            </Grid>
          </DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  name="clientName"
                  defaultValue={clientName}
                  onChange={handleInputChange}
                  className={classes.inputs}
                  id="outlined-basic"
                  label="Client Name"
                  variant="outlined"
                  error={error.clientName}
                />
                <TextField
                  name="amount"
                  defaultValue={amount}
                  className={classes.inputs}
                  onChange={handleInputChange}
                  type="number"
                  id="outlined-basic"
                  label="Amount ($)"
                  variant="outlined"
                  error={error.amount}
                />
                <TextField
                  name="started"
                  InputLabelProps={{ shrink: true }}
                  className={classes.inputs}
                  onChange={handleInputChange}
                  defaultValue={started}
                  type="date"
                  id="outlined-basic"
                  label="Start Date"
                  variant="outlined"
                  error={error.started}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="technology"
                  defaultValue={technology}
                  onChange={handleInputChange}
                  className={classes.inputs}
                  id="outlined-basic"
                  label="Technology"
                  variant="outlined"
                  error={error.technology}
                />
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Status
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    defaultValue={status}
                    name="status"
                    onChange={handleInputChange}
                    label="Status"
                    error={error.status}
                  >
                    <MenuItem value={"Active"}>Active</MenuItem>
                    <MenuItem value={"Closed"}>Closed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

export default ClientDetailsDialog;
