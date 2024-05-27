import React, { useCallback, useEffect, useState } from 'react';
import { Paper, Typography, Button, Box, Grid, Divider, TextField, IconButton } from '@mui/material';
import CommandSendForm from '../components/CommandSendForm';
import CommandTable from '../components/CommandTable';
import { get, put } from '../network/axiosConfig';
import RefreshIcon from '@mui/icons-material/Refresh';
import PropTypes from 'prop-types';

export default function AppManage(props) {

  AppManage.propTypes = {
    appId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    playground: PropTypes.bool
  };

  const [status, setStatus] = useState('UNKNOWN STATUS');
  const [gettingStatus, setGettingStatus] = useState(false);
  const [stopping, setStopping] = useState(false);
  const [starting, setStarting] = useState(false);
  const [scheduledStartTimestamp, setScheduledStartTimestamp] = useState('');
  const [scheduledStopTimestamp, setScheduledStopTimestamp] = useState('');
  const [commands, setCommands] = useState([]);

  useEffect(() => {
    fetchCommands();
  }, []);

  const fetchCommands = useCallback(async () => {
    try {
      const response = await get('/commands/application/' + props.appId);
      setCommands(response.data);
    } catch (error) {
      console.error('Error fetching commands:', error);
    }
  }, []);

  const getURLPrefix = () => {
    return props.playground ? '/playground' : '';
  }

  const getApplicationStatus = async () => {
    setGettingStatus(true);
    setStatus('Getting status...');
    const result = await get(`${getURLPrefix()}/commands/application/${props.appId}/status`);
    fetchCommands();
    console.log(result)
    let status = result.data.status;
    if(status === "exited"){
      status = "not running"
    }
    setStatus(status ? status.toUpperCase() : result.data.message);
    setGettingStatus(false);
  }

  const startApplicationScheduled = async () => {
    const timeStamp = (Date.now()/1000) + parseInt(scheduledStartTimestamp);
    const result = await put(`${getURLPrefix()}/commands/application/${props.appId}/start/${timeStamp}`);
    fetchCommands();
    console.log(result)
  }

  const stopApplicationScheduled = async () => {
    const timeStamp = (Date.now()/1000) + parseInt(scheduledStopTimestamp);
    const result = await put(`${getURLPrefix()}/commands/application/${props.appId}/stop/${timeStamp}`);
    fetchCommands();
    console.log(result)
  }
    

  const startApplication = async () => {
    setStarting(true);
    const result = await put(`${getURLPrefix()}/commands/application/${props.appId}/start`);
    setStarting(false);
    fetchCommands();
    console.log(result)
  }

  const stopApplication = async () => {
    setStopping(true);
    const result = await put(`${getURLPrefix()}/commands/application/${props.appId}/stop`);
    setStopping(false);
    fetchCommands();
    console.log(result)
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 4, margin: 'auto', width: "70%" }}>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom textAlign={'center'}>
          {props.name}
        </Typography>
        <Typography variant="h6" gutterBottom textAlign={'center'} style={{ color: props.playground ? 'green' : 'red' }}>
          {props.playground ? 'Playground' : 'On Platform 5'}
        </Typography>
        <Box style={{display: 'flex', justifyContent: `center`, alignItems: `center`, gap: `8px`}}>
          <Box gutterBottom textAlign={'center'} style={{ color: status === 'RUNNING' ? 'green' : 'red' }}>
            {status}
          </Box>
          <IconButton onClick={() => getApplicationStatus()} color='primary' disabled={gettingStatus}>
            <RefreshIcon />
          </IconButton>
        </Box>
      </Paper>
      <Grid container spacing={2} alignItems="stretch">
        <Grid item xs={6}>
          <Paper elevation={3} sx={{ padding: 2, marginTop: 2, height: '100%' }}>   
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom textAlign={'center'}>
                  Manual Commands
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button 
                  variant="contained" 
                  color="success"
                  fullWidth
                  disabled={starting || status === 'RUNNING'}
                  onClick={() => startApplication()}
                >
                  {
                    starting ? 'Starting...' : 'Start Application'}
                </Button> 
              </Grid>   
              <Grid item xs={12}>
                <Button
                  variant="contained" 
                  color='error'
                  fullWidth
                  disabled={stopping || status === 'NOT RUNNING'}
                  onClick={() => stopApplication()}
                >
                  {
                    stopping ? 'Stopping...' : 'Stop Application'}
                </Button>
              </Grid>         
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3} sx={{ padding: 2, marginTop: 2, height: '100%' }}>    
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom textAlign={'center'}>
                  Scheduled Commands
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Start after (seconds)"
                  name="commandPayload"
                  fullWidth
                  variant='standard'
                  required
                  size='small'
                  value={scheduledStartTimestamp}
                  onChange={(e) => {
                    const value = e.target.value;
                    const onlyDigits = value.replace(/\D/g, ''); // Remove non-digit characters
                    setScheduledStartTimestamp(onlyDigits);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Button 
                  variant="contained" 
                  color="primary"
                  fullWidth
                  disabled={scheduledStartTimestamp === ''}
                  onClick={() => startApplicationScheduled()}
                >
                  {
                    starting ? 'Starting...' : 'Start Application'}
                </Button> 
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Stop after (seconds)"
                  name="commandPayload"
                  fullWidth
                  variant='standard'
                  required
                  size='small'
                  value={scheduledStopTimestamp}
                  onChange={(e) => {
                    const value = e.target.value;
                    const onlyDigits = value.replace(/\D/g, ''); // Remove non-digit characters
                    setScheduledStopTimestamp(onlyDigits);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained" 
                  color="primary"
                  fullWidth
                  disabled={scheduledStopTimestamp === ''}
                  onClick={() => stopApplicationScheduled()}
                >
                  {stopping ? 'Stopping...' : 'Stop Application'}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    <Paper elevation={3} sx={{ padding: 2, marginTop: 4 }}>
      <CommandSendForm appId={props.appId} refreshCommands={fetchCommands} playground={props.playground}/>
    </Paper>

    <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
      <Typography variant="h5" gutterBottom textAlign={'center'}>
        Commands Log
      </Typography>
      <Divider />
      <CommandTable commands={commands} />
    </Paper>
  </Box>
  );
}
