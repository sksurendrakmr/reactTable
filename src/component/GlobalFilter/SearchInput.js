import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table'

/**
 step 1-> import useState from react and useAsyncDebounce from react table
 step 2 -> create a state variable whose initial value will be equal to the filter value
 step 3 -> Define onChangeHandler function and here we can make use of debounce hook

 */

const SearchInput = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter)

  const onChangeHandler = useAsyncDebounce((value) => {
    setFilter(value || undefined)
  }, 1000)

  return (
    <span>
      Search:{' '}
      <input
        type='text'
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value)
          onChangeHandler(e.target.value)
        }}
      />
    </span>
  )
}

export default SearchInput
