import React from 'react'

const SearchInput = ({ filter, setFilter }) => {
  return (
    <span>
      Search:{' '}
      <input
        type='text'
        value={filter || ''}
        onChange={(e) => setFilter(e.target.value)}
      />
    </span>
  )
}

export default SearchInput
