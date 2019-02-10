import React from 'react'

const Day = ({ weekend, dayOfMonth }) => (
  <div className={`day${weekend ? ' weekend' : ''}`}>{dayOfMonth}</div>
)

const Add = ({ weekend }) => <div className={`add${weekend ? ' weekend' : ''}`}>dd</div>

const Start = ({ weekend }) => <div className={`start${weekend ? ' weekend' : ''}`} />

const End = ({ weekend }) => <div className={`end${weekend ? ' weekend' : ''}`} />

const Hours = ({ weekend }) => <div className={`hours${weekend ? ' weekend' : ''}`} />

const Details = ({ weekend }) => (
  <div className={`details${weekend ? ' weekend' : ''}`}>
    Blah blah
    <style jsx>
      {`
        .details {
        }
      `}
    </style>
  </div>
)

export default {
  day: Day,
  add: Add,
  start: Start,
  end: End,
  hours: Hours,
  details: Details,
}
