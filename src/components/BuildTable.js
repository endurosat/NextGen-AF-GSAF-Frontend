import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import DeployIcon from '@mui/icons-material/Publish';
import { APP_MAX_BUNDLE_SIZE, GATEWAY_APP_NAME, formatDate } from '../util/utils';
import { get, put } from '../network/axiosConfig';
import PropTypes from 'prop-types';

function BuildTable(props) {

  BuildTable.propTypes = {
    appId: PropTypes.string.isRequired,
    builds: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      version: PropTypes.string.isRequired,
      dateCreated: PropTypes.string.isRequired, // or PropTypes.instanceOf(Date) if you pass a Date object
      imagePath: PropTypes.string, // nullable
      diffPath: PropTypes.string, // nullable
      bundleSize: PropTypes.number.isRequired
    })).isRequired,
    // Assuming 'refresh' is a function prop
    name: PropTypes.string.isRequired,
    refresh: PropTypes.func.isRequired
  };

  const [preparing, setPreparing] = useState({});
  const [updating, setUpdating] = useState({});
  const [deployedBuildId, setDeployedBuildId] = useState(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await get(`/applications/${props.appId}`);
        setDeployedBuildId(response.data.deployedBuild?.id);
      } catch (error) {
        console.error('Error fetching application:', error);
      }
    };
    fetchApplication();
  }, []);

  const handlePrepareForDeployment = async (build) => {
    setPreparing(prev => ({ ...prev, [build.id]: true }));
    await put(`/builds/${build.id}/prepare-for-deploy`);
    setPreparing(prev => ({ ...prev, [build.id]: false }));
    setDeployedBuildId(build.id);
    props.refresh();
  };

  const handleUpdateApplication = async (build) => {
    setUpdating(prev => ({ ...prev, [build.id]: true }));
    if(props.name === GATEWAY_APP_NAME){
      await put(`/commands/framework/update`);
    }
    else{
      await put(`/commands/application/${props.appId}/update`);
    }
    setUpdating(prev => ({ ...prev, [build.id]: false }));
  };

  const getLastPartOfUrl = (url) => {
    if (url === null || url === undefined) return ('N/A');
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  const getBackgroundColor = (build) => {
    if (!build.diffPath) {
      return 'white';
    }
    
    if (build.bundleSize < APP_MAX_BUNDLE_SIZE) {
      return 'lightgreen';
    } 
    
    return 'lightcoral';
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="builds table">
        <TableHead>
          <TableRow>
            <TableCell>Version</TableCell>
            <TableCell>Date Created</TableCell>
            <TableCell>Image Path</TableCell>
            <TableCell>Diff Path</TableCell>
            <TableCell>Bundle size (MB)</TableCell>
            <TableCell>Prepare for Deployment</TableCell>
            <TableCell>Update Application</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.builds.map((build) => (
            <TableRow
              key={build.id}
              style={{
                backgroundColor: getBackgroundColor(build) 
              }}
            >
              <TableCell>{build.version}</TableCell>
              <TableCell>{formatDate(build.dateCreated)}</TableCell>
              <TableCell>{getLastPartOfUrl(build.imagePath)}</TableCell>
              <TableCell>{getLastPartOfUrl(build.diffPath)}</TableCell>
              <TableCell>{build.bundleSize}</TableCell>
              <TableCell>
                <Button
                  variant='contained'
                  onClick={() => handlePrepareForDeployment(build)}
                  startIcon={<DeployIcon />}
                  disabled={preparing[build.id] || (build.bundleSize > APP_MAX_BUNDLE_SIZE)}
                >
                  {preparing[build.id] ? 'Preparing...' : 'Prepare'}
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant='contained'
                  onClick={() => handleUpdateApplication(build)}
                  startIcon={<DeployIcon />}
                  disabled={updating[build.id] || build.id !== deployedBuildId || (build.bundleSize > APP_MAX_BUNDLE_SIZE)}
                >
                  {updating[build.id] ? 'Updating...' : 'Update'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BuildTable;
