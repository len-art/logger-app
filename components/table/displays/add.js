import React from 'react'

export default ({
  weekend, monthIndex, dayOfWeek, addEvent, deleteEvent, event, eventIndex,
}) => {
  const [isEmpty, setIsEmpty] = React.useState(false)

  React.useEffect(() => {
    if (!event.start && !event.end && !event.details) {
      setIsEmpty(true)
    } else {
      setIsEmpty(false)
    }
  }, [event.start, event.end, event.details])

  const handleClick = () => {
    if (isEmpty && eventIndex !== 0) {
      deleteEvent({ eventId: event.id })
    } else {
      addEvent({ dayInMonth: monthIndex })
    }
  }
  return (
    <div className={`add${weekend ? ' weekend' : ''}${dayOfWeek % 2 ? ' highlight' : ''}`}>
      <button onClick={handleClick}>{isEmpty && eventIndex !== 0 ? '-' : '+'}</button>
    </div>
  )
}
