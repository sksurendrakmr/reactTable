/**
 * step 3
 we need to create a table instance.
This is where we are going to make use of react table library

in the useTable hooks, we are passing an object as an argument.
In the object, we specify two properties:- columns and rows(data)
we can set columns to the imported array of COLUMNS that we hava created.
and data to the imported MOCK_DATA.

useTable hooks recommend that we memoize the rows and columns using 
useMemo hooks.
using useMemo hooks ensures that the data isn't recreated on every render.
 If we were not to memoize columns and data, react-table would think that it is receiving new data
 on every render and atempt to recalculate lots of logic every single time.
That would definitely affect the components performance.

A call to useTable will return a table instance which we will store in a 
constant

 */

/**
 * step 4
 Define a basic table structure using HTML

 Step5 
 we need to use table instance with our jsx to render all necessary UI.

 getTableProps -> function that needs to be destructured on the table tag. 
 getTableBodyProps -> function that needs to be destructured on the tbody tag. 
 headerGroups -> this contains the column heading information which belongs inside 
                the thead tag of the table.
                headerGroups is an array which requires us to use the map method
                to render the JSX for each headerGroup.
 */

import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './columns'
import './table.css'

const BasicTable = () => {
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, [])
  const tableInstance = useTable({
    columns,
    data,
  })

  //These are functions and arrays which is provided by react table to enable easy table creatation
  //we have to use all these with HTML for react table work as intended
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance
  console.log(getTableBodyProps())
  console.log(getTableProps())
  console.log(headerGroups)
  console.log(rows)

  return (
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
        <tr>
          <td></td>
        </tr>
      </tbody>
    </table>
  )
}

export default BasicTable
