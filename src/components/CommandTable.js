import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { formatDate } from '../util/utils';
import PropTypes from 'prop-types';

function CommandTable(props) {

  CommandTable.propTypes = {
    commands: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        dateSent: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        cmdType: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired
      })
    ).isRequired
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="commands table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '30%' }}>Date Sent</TableCell>
            <TableCell style={{ width: '30%' }}>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.commands.map((command) => (
            <TableRow key={command.id}>
              <TableCell>{formatDate(command.dateSent)}</TableCell>
              <TableCell>{command.name}</TableCell>
              <TableCell>{command.cmdType}</TableCell>
              <TableCell>{command.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CommandTable;
