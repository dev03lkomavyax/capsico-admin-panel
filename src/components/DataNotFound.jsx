import React from 'react'

const DataNotFound = ({ name }) => {
  return (
    <div className='w-full text-center py-5 text-muted-foreground text-sm'>{name} not found.</div>
  )
}

export default DataNotFound