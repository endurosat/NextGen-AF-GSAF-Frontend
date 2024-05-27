import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Divider, Grid} from '@mui/material';
import { formatDate } from '../util/utils';
import { post } from '../network/axiosConfig';

function History(props) {

  const [historyRecords, setHistoryRecords] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await post(`/history/filter`);
        setHistoryRecords(response.data);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };
    fetchHistory();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, padding: 4, margin: 'auto', width: "80%" }}>
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom textAlign={'center'}>
        History Log
      </Typography>
      <Divider />
      <Grid container spacing={2} padding={"8px"}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom textAlign={'center'}>
            Filter by date, type, application, user should be here
          </Typography>
        </Grid>
        <Grid item xs={12}>
        <TableContainer component={Paper}>
        <Table aria-label="history table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Application</TableCell>
              <TableCell>User</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historyRecords.map((history) => (
              <TableRow key={history.id}>
                <TableCell>{formatDate(history.dateOfExecution)}</TableCell>
                <TableCell>{history.name}</TableCell>
                <TableCell>{history.description}</TableCell>
                <TableCell>{history.applicationName}</TableCell>
                <TableCell>{history.userName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  </Box>
  );
}

export default History;
