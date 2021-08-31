/**
 * step 1 -> import usePagination from react table and pass it in as
            second argument in useTable hook
 * step 2 -> Instead of destructuring rows, we will destructure page from table instance
            and use that instead of rows in the JSX.

To implement go back and forth between different pages
step 1-> Destructure two more property from table instance
        a) nextPage
        b)previousPage
        These are helper functions that react table gives us for navigating
        across the different pages
step 2-> Add two buttons in the JSX and handle their click event
        and onClick we invoke the nextPage and previousPage function that
        we just destructure from the table instance

There are two more properties that we can destructure from tableInstance
which will benefits our pagination implementation.
and those properties are canNextPage and canPreviousPage
These are boolean properties that indicate whether we can go next or pervious
These are helpful when we bind them to the disable property of the buttons
 
To indicate how many pages are there in total and what page are they currently viewing
pageOptions and state
and from state we further destructure pageIndex
*/

import React, { useMemo } from 'react'
import { useTable, usePagination } from 'react-table'
import MOCK_DATA from '../MOCK_DATA.json'
import { COLUMNS } from '../columns'
import '../table.css'

const PaginationTable = () => {
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, [])
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    usePagination
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
  } = tableInstance

  const { pageIndex } = state

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGrp) => (
            <tr {...headerGrp.getHeaderGroupProps()}>
              {headerGrp.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
      </div>
    </>
  )
}

export default PaginationTable
