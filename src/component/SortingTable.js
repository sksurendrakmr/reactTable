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

/**
 * Sorting and formatting
 * If we have a date in string format, sorting would happen as if date
 * coulmn is a string field and not date field.
 *
 * So we have to make sure that the data we provide to the table is not
 * already formatted.
 *
 * Note: - React table needs proper date format as its input to support
 * sorting
 *But react table provide a simple way to format any column data.

 In our case we want to format the date fields
 In COLUMNS array, the column which we want to format, define another
 property called Cell
 
 The Cell property controls what is rendered in the UI.
 Cell property is equal to a function and it receives a couple of things
 as its argument but for this case we are only interested in the raw
 value of the column.

 When dealing with date column and sorting, make sure to preserve the date type
 when passing the data into the react table.
 For formatting use the Cell property for each column.
 We will get access to the raw value of each row for that column and we can
 transform that value into any desired format.

 *
 */

import React, { useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS, GROUPED_COLUMNS } from './columns'
import './table.css'

const BasicTable = () => {
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

  const getSortedData = () => {
    let sortedData = []
    rows.map((row) => sortedData.push(row.values))
    return sortedData
  }

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

export default BasicTable
