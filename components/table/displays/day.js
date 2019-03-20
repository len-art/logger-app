import React from 'react'

export default ({
  weekend, monthIndex, dayOfWeek, eventIndex,
}) => (
  <div className={`day${weekend ? ' weekend' : ''}${dayOfWeek % 2 ? ' highlight' : ''}`}>
    {eventIndex === 0 ? monthIndex : ''}
  </div>
)
