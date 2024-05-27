import React, { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { get, post } from '../network/axiosConfig';
import { AppBar, Button, FormControl, InputLabel, MenuItem, Paper, Select, Tab, Tabs } from '@mui/material';
import AppManage from './AppManage';
import SystemLogger from '../components/SystemLogger';
import PropTypes from 'prop-types';

export default function Playground(props) {


  Playground.propTypes = {
    appId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  };

  const [status, setStatus] = useState("STOPPED");
  const [buildDeployed, setBuildDeployed] = useState("NOT DEPLOYED");
  const [builds, setBuilds] = useState([]);
  const [selectedImagePath, setSelectedImagePath] = useState('');

  const [starting, setStarting] = useState(false);
  const [stopping, setStopping] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    fetchStatuses();
    fetchBuilds();
  }, []);

  const selectBuildToDeploy = (buildId) => {
    setSelectedImagePath(buildId);
  };

  const fetchBuilds = useCallback(async () => {
    try {
      const response = await get('/builds/application/' + props.appId);
      setBuilds(response.data);
    } catch (error) {
      console.error('Error fetching builds:', error);
    }
  });

  const fetchStatuses = useCallback(async () => {
    try {
      let response = await get('/playground/status/' + props.appId);
      setStatus(response.data);
      response = await get('/playground/deployed/' + props.appId);
      setBuildDeployed(response.data);
    } catch (error) {
      console.error('Error :', error);
    }
  }, []);

  const startPlayground = async () => {
    setStarting(true);
    await post('/playground/start/' + props.appId);
    setStarting(false);    
    await fetchStatuses();
  }

  const stopPlayground = async () => {
    setStopping(true);
    await post('/playground/stop/' + props.appId);
    setStopping(false);
    await fetchStatuses();
  }

  const deployToPlayground = async () => {
    setDeploying(true);
    await post('/playground/deploy/' + selectedImagePath);
    setDeploying(false);
    await fetchStatuses();
  }


  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const renderStopped = () => {
    return (
      <Box sx={{ flexGrow: 1, padding: 4, margin: 'auto', width: "70%" }}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h6" textAlign={'center'}>Playground for {props.name} stopped</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="success"
              onClick={() => startPlayground()}
              disabled={starting}
            >
              {starting ? 'Starting...' : 'Start Playground'}
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  }

  const renderStarted = () => {
    return (
      <Box>
          <Box sx={{ flexGrow: 1, padding: 4, margin: 'auto', width: "70%", display: 'flex', justifyContent: 'center' }}>
            <Button 
              variant="contained" 
              color="error" 
              onClick={() => stopPlayground()}
              disabled={stopping}
            >
              {stopping ? 'Stopping...' : 'Stop Playground'}
            </Button>
          </Box>
          {
            buildDeployed === "DEPLOYED" ? 
            <Box sx={{ width: '100%', margin: 'auto' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <AppBar position="static">
                  <Tabs 
                    value={tabValue} 
                    onChange={handleTabChange} 
                    aria-label="basic tabs example"
                    variant="fullWidth"
                    indicatorColor="secondary"
                    textColor="inherit">
                    <Tab label="Manage" {...a11yProps(0)} />
                    <Tab label="System Logs" {...a11yProps(1)} />
                  </Tabs>
                </AppBar>
              </Box>
              <TabPanel value={tabValue} index={0}>
                <AppManage name={props.name} appId={props.appId} playground={true} />
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <SystemLogger appId={props.appId} />
              </TabPanel>
            </Box> : 
            <Box sx={{ flexGrow: 1, padding: 4, margin: 'auto', width: "70%" }}>
              <Paper elevation={3} sx={{ padding: 2 }}>
              {/* select field with all builds */}
                <Typography variant="h6" textAlign={'center'} >Playground for {props.name} running</Typography>
                <Typography variant="h6" textAlign={'center'} >No build deployed</Typography>
                  
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Builds</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedImagePath}
                    label="Builds"
                    onChange={(event)=>selectBuildToDeploy(event.target.value)}
                  >
                    {builds.map(build => {
                      const fileName = build.imagePath.split('/').pop();
                      return (
                        <MenuItem key={build.id} value={build.id}>{fileName}</MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button 
                    variant="contained" 
                    color="primary"
                    style={{marginTop: '10px'}}
                    onClick={()=>deployToPlayground()}
                    disabled={deploying}
                  >
                    {deploying ? 'Deploying...' : 'Deploy'} 
                  </Button>
                </Box>
              </Paper>
            </Box>
          }
        </Box>
    );
  }

  const renderContentBasedOnStatus = () => {
    switch (status) {
      case 'STOPPED':
        return renderStopped();
      case 'STARTED':
        return renderStarted();
      default:
        return <Typography variant="h6">Status: {status}</Typography>;
    }
  }

  return (
    <Box>
      {renderContentBasedOnStatus()}
    </Box>
  );
}

function TabPanel(props) {

  TabPanel.propTypes = {
    children: PropTypes.node.isRequired,
    value: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired
  };
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}