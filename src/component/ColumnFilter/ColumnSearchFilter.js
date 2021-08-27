import React from 'react'

/**
 Here instead of filter and setFilter props, the component will
 automatically receive the column as its props.

 And fom the column props, we will destructure filterValue and
 setFilter value.
 */
const ColumnSearchFilter = ({ column }) => {
  const { filterValue, setFilter } = column
  return (
    <span>
      Search:{' '}
      <input
        type='text'
        value={filterValue || ''}
        onChange={(e) => setFilter(e.target.value)}
      />
    </span>
  )
}

export default ColumnSearchFilter
