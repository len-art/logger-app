import React from 'react'

export default ({
  weekend, monthIndex, dayOfWeek, addEvent,
}) => (
  <div className={`add${weekend ? ' weekend' : ''}${dayOfWeek % 2 ? ' highlight' : ''}`}>
    <button onClick={() => addEvent({ dayInMonth: monthIndex })}>+</button>
  </div>
)
