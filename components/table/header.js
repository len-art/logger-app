import React from 'react'

export default ({ columns }) => (
  <>
    {columns.map(({ id, display }) => (
      <div key={id} className={id}>
        {display}
      </div>
    ))}
  </>
)
