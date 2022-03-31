import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow
} from '@mui/material';
import uniqueString from 'unique-string';

import PaginationActions from './PaginationActions.js';
import ProgressSpinner from '../ProgressSpinner.js';

const DataLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const PaginatedTable = ({ name, rows, columns, selectedRow, size, handleRowClick, rowsNum, selectionLoading }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsNum || 10);

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

  useEffect(() => console.log('selectionLoading', selectionLoading), [selectionLoading]);
  return (
    <Table aria-label={name} size={size || 'medium'}>
      <TableBody>
        <TableRow>
          {
            columns.map(c =>
              <TableCell key={uniqueString()}>{c.label}</TableCell>
            )
          }
        </TableRow>
        {
          selectionLoading && selectionLoading.state === true ? (
            <DataLoading style={{ height: 53 * rowsPerPage, backgroundColor: 'pink' }}> // need to get the width to centralise the spinner
              <ProgressSpinner size='3rem' colour='blue' />
            </DataLoading>
          ) : (
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
                  },
                  height: '53px'
                }}
                hover={!!handleRowClick}
                onClick={handleRowClick ? () => handleRowClick(row.id) : null}
                selected={selectedRow && row.id === selectedRow[`${row.id.split('-')[0]}_id`]}
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
          )
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
            rowsPerPageOptions={[8, 16, 24]}
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
  );
};

PaginatedTable.propTypes = {
  name: PropTypes.string.isRequired,
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  selectionLoading: PropTypes.object,
  selectedRow: PropTypes.object,
  size: PropTypes.string,
  handleRowClick: PropTypes.func
};

export default PaginatedTable;
