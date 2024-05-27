import React, { useEffect, useState } from 'react';
import { Paper, Typography, Box, Grid, Divider, Button } from '@mui/material';
import BuildTable from '../components/BuildTable';
import { get, getFile, post } from '../network/axiosConfig';
import DownloadIcon from '@mui/icons-material/Download';
import { GATEWAY_APP_NAME } from '../util/utils';
import PropTypes from 'prop-types';


export default function AppBuilds(props) {

  AppBuilds.propTypes = {
    appId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  };
  
  const [builds, setBuilds] = useState([]);
  const [building, setBuilding] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    fetchBuilds();
  }, [props.appId]);
  
  const fetchBuilds = async () => {
    try {
      const response = await get(`/builds/application/${props.appId}`);
      console.log('fetchBuilds response:', response.data);
      setBuilds(response.data);
    } catch (error) {
      console.error('Error fetching builds:', error);
    }
  };
  
  const createNewBuild = async () => {
    try {
      setBuilding(true);
      await post(`/builds/application/${props.appId}`);
      fetchBuilds();
    } catch (error) {
      console.error('Error creating new build:', error);
    }
    finally {
      setBuilding(false);
    }
  }

  const handleDownloadBaseImage = async () => {
    try {
      setDownloading(true);
      const result = await getFile(`/builds/base-image`);
      const url = window.URL.createObjectURL(new Blob([result.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `nextgen-base-image.tar`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading base image:', error);
    }
    finally {
      setDownloading(false);
    }
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 4, margin: 'auto', width: "80%" }}>
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom textAlign={'center'}>
        {props.name} Dashboard
      </Typography>
      <Typography variant="h6" gutterBottom textAlign={'center'}>
        On Platform 5
      </Typography>
      <Divider />
      <Grid container spacing={2} padding={"8px"}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom textAlign={'center'}>
            Builds
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <BuildTable appId={props.appId} name={props.name} builds={builds} refresh={fetchBuilds} />
        </Grid>
        <Grid item xs={props.name === GATEWAY_APP_NAME ? 12 : 6} style={{textAlign: "center"}}>
          <Button 
            variant="contained" 
            color="primary" 
            style={{width: "50%"}}
            disabled={building}
            onClick={() => {
              createNewBuild();
            }}
          >
            {building ? 'Building...' : 'Create Build'}
          </Button>
        </Grid>
        <Grid item xs={6} style={{textAlign: "center", display: props.name === GATEWAY_APP_NAME ? "none" : undefined}}>
        <Button
                  variant='contained'
                  onClick={() => handleDownloadBaseImage()}
                  startIcon={<DownloadIcon />}
                  style={{width: "50%"}}
                  disabled={downloading}
                >
                  {downloading ? 'Downloading...' : 'Download Base Image'}
                </Button>
        </Grid>
      </Grid>
    </Paper>
  </Box>
  );
}
