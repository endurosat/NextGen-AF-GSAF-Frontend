import * as React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { changeUser } from '../store/actions';
import { USER_ADMIN_ID, USER_ADMIN_ROLE, USER_CLIENT_ID, USER_CLIENT_ROLE } from '../util/utils';

export default function Navigation() {
  const dispatch = useDispatch();
  const userRole = useSelector(state => state.user.userRole);

  const handleIconClick = () => {
    //switch between client and admin
    let newUserId = USER_CLIENT_ID;
    let newUserRole = USER_CLIENT_ROLE;
    if(userRole == USER_CLIENT_ROLE) {
      newUserId = USER_ADMIN_ID;
      newUserRole = USER_ADMIN_ROLE;
    }
    dispatch(changeUser(newUserId, newUserRole));
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ height: '80px'}}>
        {/* Centered title and subtitle */}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h5" component="div" sx={{ mt: 1}}>
            NextGen Framework
          </Typography>
          <Typography variant="subtitle1" component="div" sx={{ mt: 1, mb: 1}}>
            Welcome, {userRole}
          </Typography>
        </Box>
        {/* Profile Icon */}
        <IconButton edge="end" color="inherit" onClick={handleIconClick}>
          <AccountCircle sx={{ fontSize: 40 }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
