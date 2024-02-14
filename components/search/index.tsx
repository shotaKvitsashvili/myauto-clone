import React from 'react'
import CarFilters from './filters'

type Props = {}

function Search({}: Props) {
  return (
    <div className='flex justify-between'>
      <CarFilters />
    </div>
  )
}

export default Search