import React from 'react'

const Day = ({ className, dayOfMonth }) => <div className={className}>{dayOfMonth}</div>

const Add = ({ className }) => <div className={className}>dd</div>

const Start = ({ className }) => <div className={className} />

const End = ({ className }) => <div className={className} />

const Hours = ({ className }) => <div className={className} />

const Details = ({ className }) => <div className={className}>Blah blah</div>

export default {
  day: Day,
  add: Add,
  start: Start,
  end: End,
  hours: Hours,
  details: Details,
}
