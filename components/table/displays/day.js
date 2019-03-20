import React, { Component } from 'react'
import { daysOfWeek } from '../../../constants'

export default ({ weekend, dayInMonth, dayOfWeek }) => (
  <div className={`day${weekend ? ' weekend' : ''}${dayOfWeek % 2 ? ' highlight' : ''}`}>
    {dayInMonth + 1}
    {' '}
    <span className="days">{daysOfWeek.names[dayOfWeek]}</span>
    <style jsx>
      {`
        .days {
          padding: 5px;
          font-size: 0.8em;
        }
      `}
    </style>
  </div>
)
