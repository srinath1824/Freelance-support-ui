import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getClientDetailsApi, getDeveloperDetailsApi, clientDeveloperMapping, clientDeveloperUnmapping } from "../ApiCalls";

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
    margin: "0.5rem"
  },
  title: {
    marginLeft: "12px"
  },
  tableHeading: {
    textAlign: "center"
  },
  backdrop: {
    backgroundColor: "#deebe8",
  }
}));

function ProjectMapping() {
  const classes = useStyles();
  const [clientDetails, setClientDetails] = useState([]);
  const [developerDetails, setDeveloperDetails] = useState([]);
  const [clientId, setClientId] = useState("");
  const [developerId, setDeveloperId] = useState("");
  const [unassignClientId, setUnassignClientId] = useState("");
  const [unassignDeveloperId, setUnassignDeveloperId] = useState("");
  const [mappingDetails, setMappingDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.allSettled([getClientDetailsApi(), getDeveloperDetailsApi()])
      .then((res) => {
        res.map((response) => {
          if (response.value.id === "clientDetails") {
            setClientDetails(response.value.data);
          } else if (response.value.id === "developerDetails") {
            setDeveloperDetails(response.value.data);
          }
        });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err)
      });
  }, []);

  useEffect(() => {
      mappingData();
    }, [clientDetails, developerDetails])
    
    const mappingData = () => {
        if(clientDetails && developerDetails) {
            let mapping = [...mappingDetails];
            clientDetails.map(clientData => {
                let mappingDeveloper = developerDetails.find(data => data._id === clientData.developerId);
                if(mappingDeveloper) {
                    mapping.push(
                      { 
                        clientName: clientData.clientName, 
                        developerName: mappingDeveloper.developerName, 
                        technology: clientData.technology,
                        clientId: clientData._id,
                        developerId: clientData.developerId
                      }
                    )
                }
            });
        setMappingDetails(mapping);
    }
  }

  const handleSelectChange = (e, val) => {
    if(val === 'client') {
        setClientId(e.target.value)
    } else if (val === 'developer') {
        setDeveloperId(e.target.value)
    }
  }

  const handleUnassignSelectChange = (e, val) => {
    if(val === 'client') {
      setUnassignClientId(e.target.value)
    } else if (val === 'developer') {
      setUnassignDeveloperId(e.target.value)
    }
  }

  const handleUnassign = () => {
    if(unassignClientId && unassignDeveloperId) {
        const promise = clientDeveloperUnmapping({ clientId: unassignClientId });
        promise.then(res => {
            let cid = res.data[0]['_id'];
            let clientIndex = mappingDetails.findIndex(data => data.clientId === cid);
            let clientMappingDetails = [...mappingDetails];
            clientMappingDetails.splice(clientIndex, 1);
            setMappingDetails(clientMappingDetails);
            setUnassignClientId("");
            setUnassignDeveloperId("");
        }).catch(err => {
          setUnassignClientId("");
          setUnassignDeveloperId("");
          console.log(err)
        })
    }
  }

  const handleAssign = () => {
    if(clientId && developerId) {
        const promise = clientDeveloperMapping({ clientId, developerId });
        promise.then(res => {
            let cid = res.data[0]['_id'];
            let did = res.data[0]['developerId'];
            let client = clientDetails.find(data => data._id === cid);
            let developer = developerDetails.find(data => data._id === did);
            setMappingDetails([
                ...mappingDetails,
                {
                  clientName: client.clientName, 
                  developerName: developer.developerName, 
                  technology: client.technology,
                  clientId: client._id,
                  developerId: developer._id
                }
            ]);
            setClientId("");
            setDeveloperId("");
        }).catch(err => {
          setClientId("");
          setDeveloperId("");
          console.log(err)
        })
    }
  };

  const handleDisableButton = (clientId, developerId) => {
    if(clientId && developerId) {
      return false
    } return true
  }

  return (
    <div>
      {loading ? (
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
    ) :
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <h3 className={classes.title}>Assign Developer to Client</h3>
          <Grid container>
            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Select Client
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  name="status"
                  // defaultValue={status}
                  label="Select Client"
                  onChange={(e) => handleSelectChange(e, 'client')}
                  // error={error.status}
                >
                  {clientDetails.map((data) => {
                    return (
                      <MenuItem value={data._id}>
                        {data.clientName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Select Developer
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  name="status"
                  // defaultValue={status}
                  label="Select Developer"
                  onChange={(e) => handleSelectChange(e, 'developer')}
                  // error={error.status}
                >
                  {developerDetails.map((data) => {
                    return (
                      <MenuItem value={data._id}>
                        {data.developerName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
            <Button className={classes.button} onClick={handleAssign} disabled={handleDisableButton(clientId, developerId)} variant="contained" color="primary">
                Assign
            </Button>
        </Grid>
        <Grid item xs={6}>
          <h2 className={classes.tableHeading}>Client-Developer Project Mapping</h2>
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead className={classes.tableHeading}>
            <TableRow>
                <TableCell>Client</TableCell>
                <TableCell>Developer</TableCell>
                <TableCell>Technology</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                { mappingDetails.map(data => {
                return <TableRow>
                    <TableCell>{data.clientName}</TableCell>
                    <TableCell>{data.developerName}</TableCell>
                    <TableCell>{data.technology}</TableCell>
                </TableRow>
                })
                }
            </TableBody>
        </Table>
        </TableContainer>
        </Grid>
        <Grid item xs={3}>
          <h3 className={classes.title}>Un-Assign Developer to Client</h3>
          <Grid container>
            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>
                  Select Client
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="unassign-clientid"
                  name="status"
                  // defaultValue={status}
                  label="Select Client"
                  onChange={(e) => handleUnassignSelectChange(e, 'client')}
                  // error={error.status}
                >
                  {mappingDetails.map((data) => {
                    return (
                      <MenuItem value={data.clientId}>
                        {data.clientName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>
                  Select Developer
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="unassigned-developerid"
                  name="status"
                  // defaultValue={status}
                  label="Select Developer"
                  onChange={(e) => handleUnassignSelectChange(e, 'developer')}
                  // error={error.status}
                >
                  {mappingDetails.map((data) => {
                    return (
                      <MenuItem value={data.developerId}>
                        {data.developerName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button className={classes.button} onClick={handleUnassign} disabled={handleDisableButton(unassignClientId, unassignDeveloperId)} variant="contained" color="secondary">
                Un-Assign
            </Button>
        </Grid>
      </Grid>
    }
    </div>
  );
}

export default ProjectMapping;
