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

// const createData = (name, calories, fat, carbs, protein) => {
//   return { name, calories, fat, carbs, protein };
// };
//
// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9)
// ];

const DDTable = ({ columns, rows }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: '100%' }} size='medium' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            {
              columns.map(c => <TableCell key={c} align='left'>{c}</TableCell>)
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='left'>{row.calories}</TableCell>
              <TableCell align='left'>{row.calories}</TableCell>
              <TableCell align='left'>{row.fat}</TableCell>
              <TableCell align='left'>{row.carbs}</TableCell>
              <TableCell align='left'>{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

DDTable.propTypes = {

};

export default DDTable;
