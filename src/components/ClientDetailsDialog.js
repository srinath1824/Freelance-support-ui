import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    inputs: {
        margin: '10px',
        width: '100%'
    },
    formControl: {
        margin: theme.spacing(1),
        width: '100%'
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

function ClientDetailsDialog({ open, handleClose, setDialogDetails, showDelete, dialogDetails }) {
    const classes = useStyles();
    const { client, technology, started, amount, status } = dialogDetails;

    const handleDateChange = (event) => {
        setDialogDetails({
            ...dialogDetails,
            [event.target.name]: event.target.value
        });
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    <Grid container>
                        <Grid item xs={10}>Add Client</Grid>
                        <Grid item xs={2}>
                            {
                                showDelete &&
                                <Button variant="outlined" color="secondary">
                                    Delete
                    </Button>
                            }
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>

                    </DialogContentText>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextField defaultValue={client} className={classes.inputs} id="outlined-basic" label="Client Name" variant="outlined" />
                            <TextField defaultValue={amount} className={classes.inputs} type="number" id="outlined-basic" label="Amount ($)" variant="outlined" />
                            <TextField name="started" InputLabelProps={{ shrink: true }} className={classes.inputs} onChange={handleDateChange} value={started} defaultValue={started} type="date" id="outlined-basic" label="Start Date" variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField defaultValue={technology} className={classes.inputs} id="outlined-basic" label="Technology" variant="outlined" />
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    defaultValue={status}
                                    value={status}
                                    label="Status"
                                >
                                    <MenuItem value={'Active'}>Active</MenuItem>
                                    <MenuItem value={'Closed'}>Closed</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
            </Button>
                    <Button onClick={handleClose} variant="contained" color="primary">
                        Submit
            </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ClientDetailsDialog;
