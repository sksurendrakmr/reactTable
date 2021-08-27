/**
 * Global Filtering
 * We have two types of filtering:-
 * 1) Global Filtering
 * 2)Column Filtering
 *
 * With global filtering, the filters apply to all columns in the table.
 
* With column filtering, fetches rows where only that particular column
 * will contain the search text.
 */

/**
 * Step 1 -> create a filter input component for our global filter
 *step 2-> import the input component and also import useGlobalFilter from react-table
  step 3-> pass this useGlobalFilter as second argument in useTable and destructure two more properties
      a) state -> table state
      b) setGlobalFilter -> which is a function to set the global filter text value

  step 4 -> destructure globalFilter from state
  step 5 ->  In the JSX, include the global filter component passing in the
            global filter value and setGlobalFilter function as props

  

  Note- For Global filtering to work, it requires that our entire data is loaded
  and the filtering happens on the client side.
 */

/**
 * Column Filter
 *step 1-> create input component and import it
 step 2 -> import useFilters Hooks from react table
 step 3 -> In the JSX, we can add the column filter component
           in every column header. 
 step 4-> Define Filter property on each column
        a)import ColumnSearchFilter in column.js
        b) Assign it to the filter property on every column
 */

import React, { useMemo } from 'react'
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table'
import MOCK_DATA from '../MOCK_DATA.json'
import { COLUMNS, GROUPED_COLUMNS } from '../columns'
import SearchInput from '../GlobalFilter/SearchInput'
import '../table.css'

const ColumnFilterTable = () => {
  const columns = useMemo(() => COLUMNS, [])
  // const columns = useMemo(() => GROUPED_COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, [])
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    footerGroups,
    state,
    setGlobalFilter,
  } = tableInstance

  const { globalFilter } = state

  const getSortedData = () => {
    let sortedData = []
    rows.map((row) => sortedData.push(row.values))
    return sortedData
  }

  return (
    <>
      <SearchInput filter={globalFilter} setFilter={setGlobalFilter} />
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
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
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
    </>
  )
}

export default ColumnFilterTable
