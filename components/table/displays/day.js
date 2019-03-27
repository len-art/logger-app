import React from 'react'
import { daysOfWeek } from '../../../constants'

export default ({
  weekend, monthIndex, dayOfWeek, eventIndex,
}) => (
  <div className={`day${weekend ? ' weekend' : ''}${dayOfWeek % 2 ? ' highlight' : ''}`}>
    {monthIndex + 1}
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
