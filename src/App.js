import React from 'react';
import './App.css';
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import ClientDetails from "./components/ClientDetails";
import DeveloperDetails from "./components/DeveloperDetails";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import Login from "./components/Login/Login"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // padding: 10,
    height: '93vh',
    // backgroundColor: '#282c34',
    overflow: 'scroll'
  },
  appBar: {
    backgroundColor: '#2596be'
  }
}));

function App() {
  const classes = useStyles();
  const [value, setValue] = React.useState('1');
  const [logged, setLogged] = React.useState(false)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    { !logged ?
    <Login setLogged={setLogged}/>
    :
    <>
    <Header />
    <div className={classes.root}>
      <TabContext value={value}>
        <AppBar className={classes.appBar} position="static">
          <TabList onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Dashboard" value="1" />
            <Tab label="Client Details" value="2" />
            <Tab label="Developer Details" value="3" />
            <Tab label="Payment Details" value="4" />
          </TabList>
        </AppBar>
        <TabPanel value="1"><Dashboard /></TabPanel>
        <TabPanel value="2"><ClientDetails /></TabPanel>
        <TabPanel value="3"><DeveloperDetails /></TabPanel>
        <TabPanel value="4">Payment Details</TabPanel>
      </TabContext>
    </div>
    </>
    }
    </>
  );
}

export default App;
