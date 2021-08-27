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

import React, { useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS, GROUPED_COLUMNS } from './columns'
import './table.css'

const FilteringTable = () => {
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

export default FilteringTable
