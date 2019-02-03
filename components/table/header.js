import React from 'react'

export default ({ columns }) => (
  <>
    {columns.map(name => (
      <div key={name} className={`${name}`}>
        {name}
      </div>
    ))}
  </>
)
