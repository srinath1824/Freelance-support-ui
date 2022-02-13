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
}));

function DeveloperDetaisDialog({
  open,
  handleClose,
  showDelete,
  dialogDetails,
  developerDetailsData,
  setDeveloperDetailsData,
  getDeveloperDetails
}) {
  const classes = useStyles();
  const {
    developerName,
    technology,
    started,
    amount,
    experience,
    company,
    mobile,
    status,
    id
  } = dialogDetails;

  const [addDeveloper, setAddDeveloper] = useState({ ...dialogDetails });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    developerName: false,
    technology: false,
    amount: false,
    started: false,
    experience: false,
    company: false,
    mobile: false,
    status: false,
});

  const handleInputChange = (event) => {
    setAddDeveloper({
        ...addDeveloper,
        [event.target.name]: event.target.value,
      });
  };

  const validation = () => {
    let errs = {...error}
    if(Object.keys(addDeveloper).length === 0) {
        for(let i in error) {
            errs[i] = true;
        }
    } else {
        for (let i in addDeveloper) {
            if (addDeveloper[i] === "" || addDeveloper[i] === undefined) {
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
          axios.post(`${process.env.REACT_APP_SERVER_URL}/api/fs/developer/createDeveloperDetails`, addDeveloper)
            .then(res => {
                setLoading(false);
                setDeveloperDetailsData([
                    ...developerDetailsData,
                    addDeveloper
                ]);
                handleClose();
                getDeveloperDetails();
            }).catch(err => {
                setLoading(false);
                console.log(err);
            })
        } else {
          axios.put(`${process.env.REACT_APP_SERVER_URL}/api/fs/developer/updateDeveloperDetails/${id}`, addDeveloper)
        .then(res => {
            setLoading(false);
            setDeveloperDetailsData([
                ...developerDetailsData,
                addDeveloper
            ]);
            handleClose();
            getDeveloperDetails();
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
      .delete(`${process.env.REACT_APP_SERVER_URL}/api/fs/developer/deleteDeveloperDetails/${id}`)
      .then((res) => {
        setLoading(false);
        const data = [...developerDetailsData];
        const index = developerDetailsData.findIndex((a) => a.id === id);
        data.splice(index, 1);
        setDeveloperDetailsData(data);
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
      ) :
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <Grid container>
            <Grid item xs={10}>
              Add Developer
            </Grid>
            <Grid item xs={2}>
              {showDelete && (
                <Button onClick={handleDeleteClick} variant="outlined" color="secondary">
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
                defaultValue={developerName}
                className={classes.inputs}
                name="developerName"
                id="outlined-basic"
                label="Developer Name"
                variant="outlined"
                onChange={handleInputChange}
                error={error.developerName}
              />
              <TextField
                defaultValue={technology}
                className={classes.inputs}
                name="technology"
                id="outlined-basic"
                label="Technology"
                variant="outlined"
                onChange={handleInputChange}
                error={error.technology}
              />
              <TextField
                defaultValue={started}
                className={classes.inputs}
                name="started"
                InputLabelProps={{ shrink: true }}
                type="date"
                onChange={handleInputChange}
                defaultValue={started}
                id="outlined-basic"
                label="Start Date"
                variant="outlined"
                error={error.started}
              />
              <TextField
                defaultValue={amount}
                className={classes.inputs}
                name="amount"
                type="number"
                id="outlined-basic"
                label="Amount (Rs)"
                variant="outlined"
                onChange={handleInputChange}
                error={error.amount}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                defaultValue={experience}
                className={classes.inputs}
                name="experience"
                id="outlined-basic"
                label="Experience"
                variant="outlined"
                onChange={handleInputChange}
                error={error.experience}
              />
              <TextField
                defaultValue={company}
                className={classes.inputs}
                name="company"
                id="outlined-basic"
                label="Company"
                variant="outlined"
                onChange={handleInputChange}
                error={error.company}
              />
              <TextField
                defaultValue={mobile}
                className={classes.inputs}
                id="outlined-basic"
                label="Mobile"
                name="mobile"
                variant="outlined"
                onChange={handleInputChange}
                error={error.mobile}
              />
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  name="status"
                  defaultValue={status}
                  label="Status"
                  onChange={handleInputChange}
                  error={error.status}
                >
                  <MenuItem value={"Active"}>Active</MenuItem>
                  <MenuItem value={"Blocked"}>Blocked</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    }
    </div>
  );
}

export default DeveloperDetaisDialog;
