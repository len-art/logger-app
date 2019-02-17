import React from 'react'

export default ({ weekend, dayOfWeek }) => (
  <div className={`end${weekend ? ' weekend' : ''}${dayOfWeek % 2 ? ' highlight' : ''}`} />
)
