import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBuilds from '../pages/AppBuilds';
import AppManage from '../pages/AppManage';
import Playground from '../pages/Playground';
import { Route, Routes } from 'react-router-dom';
import History from '../pages/History';
import PropTypes from 'prop-types';

ContentComponent.propTypes = {
  applications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired
};

export default function ContentComponent(props) {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar sx={{ height: '80px'}} />
      <Routes>
        {/* Define Route for each path */}
        {
          props.applications.map((app) => {
            return (
              <>
                <Route key={app.id} path={`/apps/${app.name}/manage`}     element={<AppManage   name={app.name} appId={app.id} playground={false}/>} />
                <Route key={app.id} path={`/apps/${app.name}/builds`}     element={<AppBuilds   name={app.name} appId={app.id} />} />
                <Route key={app.id} path={`/apps/${app.name}/playground`} element={<Playground  name={app.name} appId={app.id} />} />
                <Route key={app.id} path={`/apps/${app.name}/history`}    element={<History     name={app.name} appId={app.id} />} />
              </>
            )
          }
          )
        }

        {/* Optionally, you can add a default route */}
        <Route path="*" element={<Typography paragraph>Default content or Page not found</Typography>} />
      </Routes>
    </Box>
  );
}
