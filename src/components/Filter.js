import React from 'react'

const Filter = ({ setNewFilter }) => {

  return (
    <div>
        filter shown with <input onChange={(e) => setNewFilter(e.target.value)} />
    </div>
  )
}

export default Filter