import React from 'react'

export default ({
  weekend, dayOfWeek, dayInMonth, addLocalDetail,
}) => (
  <div className={`add${weekend ? ' weekend' : ''}${dayOfWeek % 2 ? ' highlight' : ''}`}>
    <button onClick={() => addLocalDetail(dayInMonth)}>+</button>
  </div>
)
