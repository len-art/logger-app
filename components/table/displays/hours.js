import React from 'react'

export default ({ weekend, dayOfWeek }) => (
  <div className={`hours${weekend ? ' weekend' : ''}${dayOfWeek % 2 ? ' highlight' : ''}`} />
)
