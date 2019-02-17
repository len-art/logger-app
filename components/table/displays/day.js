import React, { Component } from 'react'

export default ({ weekend, dayInMonth, dayOfWeek }) => (
  <div className={`day${weekend ? ' weekend' : ''}${dayOfWeek % 2 ? ' highlight' : ''}`}>
    {dayInMonth}
  </div>
)
