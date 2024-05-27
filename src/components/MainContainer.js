import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from './Drawer';
import Content from './Content';
import Navigation from './Navigation';
import { get } from '../network/axiosConfig';
import Toast from './Toast';
import { useSelector } from 'react-redux';


export default function MainContainer() {

  const [applications, setApplications] = useState([]);
  const userId = useSelector(state => state.user.userId);


  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await get(`/applications/user/${userId}`);
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching commands:', error);
      }
    };

    fetchApplications();
  }, [userId]);

  return (
    <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Toast />
        <Navigation />
        <Drawer applications={applications}/>
        <Content applications={applications} />
    </Box>
  );
}
