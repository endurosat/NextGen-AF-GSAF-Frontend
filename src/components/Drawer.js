import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import AppShortcutIcon from '@mui/icons-material/AppShortcut';
import BugReportIcon from '@mui/icons-material/BugReport';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import { GATEWAY_APP_NAME } from '../util/utils';
import PropTypes from 'prop-types';

const drawerWidth = 240;

export default function DrawerComponent(props) {

  DrawerComponent.propTypes = {
    applications: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired
      })
    ).isRequired
  };
  
  const location = useLocation();
  console.log(location); // Check what the location object contains 
  
  const [open, setOpen] = React.useState(props.applications.map((app) => {
    let obj = {};
    obj[app.name] = false;
    return obj;
  }));

  const handleClick = (app) => {
    setOpen({ ...open, [app]: !open[app] });
  };
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar sx={{ height: '80px' }} />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {
            props.applications.map((app, index) => {
              return (
                <>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleClick(app.name)}>
                      <ListItemIcon>
                        <AppShortcutIcon />
                      </ListItemIcon>
                      <ListItemText primary={app.name} />
                      {open[app.name] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                  </ListItem>
                  <Collapse in={open[app.name]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }} component={Link} to={'/apps/'+app.name+'/manage'} style={{ display: app.name === GATEWAY_APP_NAME ? "none" : undefined }}>
                        <ListItemIcon>
                          <ManageAccountsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Manage" />
                      </ListItemButton>
                      <ListItemButton sx={{ pl: 4 }} component={Link} to={'/apps/'+app.name+'/builds'}>
                        <ListItemIcon>
                          <BuildCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Builds" />
                      </ListItemButton>
                      <ListItemButton  sx={{ pl: 4 }} component={Link} to={'/apps/'+app.name+'/playground'} style={{ display: app.name === GATEWAY_APP_NAME ? "none" : undefined }}>
                        <ListItemIcon>
                          <BugReportIcon />
                        </ListItemIcon>
                        <ListItemText primary="Playground" />
                      </ListItemButton>
                      <ListItemButton  sx={{ pl: 4 }} component={Link} to={'/apps/'+app.name+'/history'} style={{ display: app.name === GATEWAY_APP_NAME ? undefined : "none" }}>
                        <ListItemIcon>
                          <BugReportIcon />
                        </ListItemIcon>
                        <ListItemText primary="History" />
                      </ListItemButton>
                    </List>
                  </Collapse>
                </>
              );
            }
          )
          }
        </List>
      </Box>
    </Drawer>
  );
}
