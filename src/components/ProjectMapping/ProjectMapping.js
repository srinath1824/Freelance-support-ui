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
import { getClientDetailsApi, getDeveloperDetailsApi, clientDeveloperMapping } from "../ApiCalls";

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

function ProjectMapping() {
  const classes = useStyles();
  const [clientDetails, setClientDetails] = useState([]);
  const [developerDetails, setDeveloperDetails] = useState([]);
  const [clientId, setClientId] = useState("");
  const [developerId, setDeveloperId] = useState("");
  const [mappingDetails, setMappingDetails] = useState([]);

  useEffect(() => {
    Promise.allSettled([getClientDetailsApi(), getDeveloperDetailsApi()])
      .then((res) => {
        res.map((response) => {
          if (response.value.id === "clientDetails") {
            setClientDetails(response.value.data);
          } else if (response.value.id === "developerDetails") {
            setDeveloperDetails(response.value.data);
          }
        });
      })
      .catch((err) => console.log(err));
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
                    mapping.push({clientName: clientData.clientName, developerName: mappingDeveloper.developerName, technology: clientData.technology})
                }
            });
        console.log('8888888', mapping)
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
                {clientName: client.clientName, developerName: developer.developerName, technology: client.technology}
            ]);
        }).catch(err => console.log(err))
    }
  }
console.log(mappingDetails);
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Grid container spacing={4}>
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
          {/* <Grid container>
            <Grid item xs={4}></Grid>
            <Grid item xs={4} style={{textAlign: "center"}}>
              <Button variant="contained" color="primary">
                Assign
              </Button>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid> */}
            <Button onClick={handleAssign} variant="contained" color="primary">
                Assign
            </Button>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={4}>
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
      </Grid>
    </div>
  );
}

export default ProjectMapping;
