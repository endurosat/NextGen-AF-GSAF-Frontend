import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar, Alert } from '@mui/material';
import { hideToast } from '../store/actions';

const Toast = () => {
  const dispatch = useDispatch();
  const { message, severity, open } = useSelector(state => state.toast);

  const handleClose = () => {
    dispatch(hideToast());
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity || 'error'} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
