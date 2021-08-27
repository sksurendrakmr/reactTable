/**
 Sorting-> How to implement sorting feature in react table
 
 Note-> All feature in react table are implemented by importing one or the other hook.
 
 step 1-> import sortBy hook from react table
 
 step 2-> pass in as the second argument to the useTable hook.
 (it will adds the sorting feature to our table instance.
    The sorting feature can be directly made use of in the jsx)

step 3-> In the <th> tag, we will pass column.getSortByToggleProps() as an argument
        in getHeaderProps() function.
        This will adds properties related to the sorting feature on the
        individual column.

step 4-> After rendering column header label, we can now add an icons 
        to represent the sorted state of the column
 */

import React, { useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS, GROUPED_COLUMNS } from './columns'
import './table.css'

const SortingTable = () => {
  const columns = useMemo(() => COLUMNS, [])
  // const columns = useMemo(() => GROUPED_COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, [])
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useSortBy
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    footerGroups,
  } = tableInstance

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGrp) => (
          <tr {...headerGrp.getHeaderGroupProps()}>
            {headerGrp.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <span style={{ marginLeft: '15px' }}>
                  {column.isSorted ? (column.isSortedDesc ? 'v' : '^') : ''}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
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
      <tfoot>
        {footerGroups.map((footerGroup) => (
          <tr {...footerGroup.getFooterGroupProps()}>
            {footerGroup.headers.map((column) => (
              <td {...column.getFooterProps()}>{column.render('Footer')}</td>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  )
}

export default SortingTable
