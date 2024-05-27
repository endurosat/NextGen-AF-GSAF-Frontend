import React, { useState } from 'react';
import { Grid, Button, TextField, Typography } from '@mui/material';
import { put } from '../network/axiosConfig';
import PropTypes from 'prop-types';

export default function CommandSendForm(props) {

  CommandSendForm.propTypes = {
    appId: PropTypes.string.isRequired,
    playground: PropTypes.bool,
    refreshCommands: PropTypes.func.isRequired,
  };
  
  const [form, setForm] = useState({
    commandIdentifier: '',
    commandPayload: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendCommand = async () => {
    // Implement command sending logic here
    await put(`${props.playground ? 'playground' : ''}/commands/application/${props.appId}/send`, {
      name: form.commandIdentifier,
      request: form.commandPayload
    });
    props.refreshCommands();
    console.log('Sending Command:', form, 'to Application ID:', props.appId);
  };

  const handleClear = () => {
    setForm({
      commandIdentifier: '',
      commandPayload: '',
    });
  };

  return (
    <Grid container spacing={2} alignItems="center" padding={"8px"}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom textAlign={'center'}>
          Custom Commands
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          label="Client command identifier"
          name="commandIdentifier"
          value={form.commandIdentifier}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Client command payload"
          name="commandPayload"
          value={form.commandPayload}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </Grid>
      <Grid item xs={6}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSendCommand}
          disabled={form.commandIdentifier === ''}
        >
          Send command
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button variant="contained" color="error" fullWidth onClick={handleClear}>
          Clear
        </Button>
      </Grid>
    </Grid>
  );
}
