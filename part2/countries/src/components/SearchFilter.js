import React from 'react'

const SearchFilter = ({search, handleSearch}) => {

  return (
    <div>
      find countries <input value={search} onChange={handleSearch}/>
    </div>
  )
}

export default SearchFilter