import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import uniqueString from 'unique-string';

const DDTable = ({ columns, rows }) => {
  return (
    <TableContainer
      sx={{
        background: 'transparent',
        '-webkit-box-shadow': '-3px -1px 10px 2px rgba(0,0,0,0.2)',
        boxShadow: '-3px -1px 10px 2px rgba(0,0,0,0.2)'
      }}
      component={Paper}
    >
      <Table sx={{ width: '100%' }} size='medium' aria-label='table of my past orders'>
        <TableHead>
          <TableRow>
            {
              columns.map(c => <TableCell key={uniqueString()} align='left'>{c}</TableCell>)
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={uniqueString()}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='left'>{row.date}</TableCell>
              <TableCell align='left'>{row.orderId}</TableCell>
              <TableCell align='left'>{row.paymentStatus}</TableCell>
              <TableCell align='left'>{row.orderStatus}</TableCell>
              <TableCell align='left'>{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

DDTable.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired
};

export default DDTable;
