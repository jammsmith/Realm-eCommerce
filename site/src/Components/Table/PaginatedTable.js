import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow
} from '@mui/material';
import uniqueString from 'unique-string';

import PaginationActions from './PaginationActions';

const PaginatedTable = ({ name, rows, columns, size, handleRowClick }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const sortedRows = rows.sort((a, b) => (a.calories < b.calories ? -1 : 1));

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table
        aria-label={name}
        size={size || 'medium'}
        sx={{
          width: '100%'
        }}
      >
        <TableBody>
          <TableRow>
            {
              columns.map(c =>
                <TableCell key={uniqueString()}>{c.label}</TableCell>
              )
            }
          </TableRow>
          {
            (rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : sortedRows
            ).map((row) => (
              <TableRow
                key={uniqueString()}
                component='tr'
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  ':hover': {
                    cursor: handleRowClick ? 'pointer' : 'cursor'
                  }
                }}
                hover={!!handleRowClick}
                onClick={handleRowClick ? () => handleRowClick(row.id) : null}
              >
                {
                  columns.map(col => (
                    <TableCell key={uniqueString()} component='td'>
                      {row[col.name]}
                    </TableCell>
                  ))
                }
              </TableRow>
            ))
          }
          {
            emptyRows > 0 &&
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
          }
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page'
                },
                native: true
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={PaginationActions}
              sx={{
                '.MuiTablePagination-toolbar': {
                  justifyContent: 'flex-start'
                },
                '.MuiTablePagination-selectLabel': {
                  margin: 0
                },
                '.MuiTablePagination-select': {
                  padding: 0
                },
                '.MuiTablePagination-displayedRows': {
                  margin: '0 1rem 0 0'
                }
              }}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

PaginatedTable.propTypes = {
  name: PropTypes.string.isRequired,
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  size: PropTypes.string,
  handleRowClick: PropTypes.func
};

export default PaginatedTable;
