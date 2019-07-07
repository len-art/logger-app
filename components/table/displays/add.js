import React from 'react'

export default ({
  weekend, monthIndex, dayOfWeek, addLocalDetail,
}) => (
  <div className={`add${weekend ? ' weekend' : ''}${dayOfWeek % 2 ? ' highlight' : ''}`}>
    <button onClick={() => addLocalDetail(monthIndex)}>+</button>
  </div>
)
