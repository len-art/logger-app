import React from 'react'
import { daysOfWeek } from '../../../constants'

export default ({
  weekend, monthIndex, dayOfWeek, eventIndex,
}) => (
  <div className={`day${weekend ? ' weekend' : ''}${dayOfWeek % 2 ? ' highlight' : ''}`}>
    {eventIndex === 0 && monthIndex + 1}
    {eventIndex === 0 && <span className="weekNames">{daysOfWeek.names[dayOfWeek]}</span>}
    {console.log(monthIndex + 1, dayOfWeek)}
    <style jsx>
      {`
        .weekNames {
          padding: 5px;
          font-size: 0.8em;
        }
      `}
    </style>
  </div>
)
