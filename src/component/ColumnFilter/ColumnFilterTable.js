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

/**
    More on Filtering
    
    1.) What if we don't want column filter feature in some specific column
    If we tried to comment or remove Filter property from that specific column
    then we will get error in the browser.
    so we cannot simply remove Filter property from a column.
    If we want to disable filtering for a specific column then we need
    to add another property called disable filters and set it to true.

    Summary
    So to disable column filtering, we will use disableFilters property

    2.) About Default column property
    Right now we have the Filter property equal to ColumnFilter and this is
    the same for every single column in the table.
    It would be better to specify this property once and ask react-table to add
    it to every column.
    This is where defaultColumn comes into picture.
    step 1-> create a defaultColumn function that will return an object
             with properties that need to be applied to every column in the table.
    step 2-> This default column will then be passed into the useTable hook after
            data in the first argument

    Summary
    use default column when we have to specify a common key value pair
    for every column in the react table.

    3) Debouncing our filter functionality
    By default, the filtering is performed on every key up event in 
    our global and column filters.But if we have thousand of data then the
    table might not be as performant as we want it to be.

    The solution is debounce our onChange event in the filters.
    For that we make use of useAsynDebounce hook from react table.

    In our case we will add debouncing to our global filter.
    Summary-> make use of async debounce hook when we want to filter data.
*/

import React, { useMemo } from 'react'
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table'
import MOCK_DATA from '../MOCK_DATA.json'
import { COLUMNS, GROUPED_COLUMNS } from '../columns'
import SearchInput from '../GlobalFilter/SearchInput'
import '../table.css'
import ColumnSearchFilter from './ColumnSearchFilter'

const ColumnFilterTable = () => {
  const columns = useMemo(() => COLUMNS, [])
  // const columns = useMemo(() => GROUPED_COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, [])

  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnSearchFilter,
    }
  }, []) //we are returing an object with properties that need to be applied to every column in the table

  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn, // this is same as specifying Filter property to ColumnFilter for every column in the table
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
