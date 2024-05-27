import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { get } from '../network/axiosConfig';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const SystemLogger = (props) => {

  SystemLogger.propTypes = {
    appId: PropTypes.string.isRequired,
  };
  const [logs, setLogs] = useState([]);
  const logsEndRef = useRef(null);
  const intervalRef = useRef();

  useEffect(() => {
    // Initial fetch
    fetchLogs();
  
    // Set interval for fetching logs every second
    intervalRef.current = setInterval(() => {
      fetchLogs().catch(console.error); // Handle or log the error appropriately
    }, 1000);
  
    // Clear interval on component unmount
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  const fetchLogs = async () => {
    try {
      const newLogs = await get(`playground/logs/${props.appId}`);
      setLogs(newLogs.data);
      scrollToBottom();
    } catch (error) {
      // Handle errors, for instance, log them or show a user-friendly message
      console.error(error);
    }
  };

  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const terminalContainerStyle = {
    height: '60vh',
    overflowY: 'auto',
    backgroundColor: 'black',
    color: 'white',
    fontFamily: 'monospace',
    padding: '10px',
    borderRadius: '5px',
    textAlign: 'left'
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 4, margin: 'auto', width: "70%" }}>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom textAlign={'center'}>
          System Logs
        </Typography>
        <div style={terminalContainerStyle}>
          {logs.map((log) => (
            <Typography key={uuidv4()} variant="body1" gutterBottom style={{ whiteSpace: 'pre-wrap' }}>
              {log}
            </Typography>
          ))}
          <div ref={logsEndRef} />
        </div>
      </Paper>  
    </Box>
  );
};

export default SystemLogger;
