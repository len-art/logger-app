import React from 'react'

export default ({
  weekend, dayOfWeek, monthIndex, eventIndex, addLocalDetail, events,
}) => (
  <div className={`add${weekend ? ' weekend' : ''}${dayOfWeek % 2 ? ' highlight' : ''}`}>
    <button onClick={() => addLocalDetail(monthIndex)}>
      {events.length - 1 === eventIndex ? '+' : ''}
    </button>
  </div>
)
