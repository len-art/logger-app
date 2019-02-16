import React from 'react'

export default ({ weekend, dayOfWeek }) => (
  <div className={`start${weekend ? ' weekend' : ''}${dayOfWeek % 2 ? ' highlight' : ''}`} />
)
