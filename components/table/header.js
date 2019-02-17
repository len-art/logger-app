import React from 'react'

export default ({ columns }) => (
  <>
    {columns.map(({ id, display }) => (
      <div key={id} className={`${id} header`}>
        {display}
      </div>
    ))}
  </>
)
