import React from 'react'
import { observer } from 'mobx-react'
import { computed } from 'mobx'
import format from 'date-fns/format'

import setDate from 'date-fns/setDate'
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'

import TimePicker from '../../timePicker'

@observer
export default class extends React.Component {
  @computed
  get isSelected() {
    const { selected, event, componentId } = this.props
    return selected.eventId === event.id && selected.column === componentId
  }

  getDateFromTime = ({ hour, minute }) => setMinutes(setHours(setDate(this.props.startsAt, this.props.monthIndex + 1), hour), minute)

  handleSelect = (time) => {
    this.props.event[this.props.componentId] = this.getDateFromTime(time)
  }

  handleCommit = async ({ hour, minute }) => {
    const { editEvent, event, componentId } = this.props
    if (hour === undefined) return
    console.log(hour, minute, this.getDateFromTime({ hour, minute }))

    await editEvent({
      eventId: event.id,
      column: componentId,
      value: this.getDateFromTime({ hour, minute }),
    })

    // if (event && event.createdAt) {
    //   await editEvent({ [id]: this.inputValue }, event.id)
    // } else {
    //   await addEvent({ [id]: this.inputValue, dayInMonth: monthIndex })
    // }
  }

  handleBlur = () => {
    this.props.handleColumnSelect()
  }

  handleClick = () => {
    const { handleColumnSelect, event, componentId } = this.props
    handleColumnSelect({ eventId: event.id, column: componentId })
  }

  render() {
    const {
      weekend, monthIndex, dayOfWeek, event, componentId,
    } = this.props

    return (
      <div
        className={`${componentId}${weekend ? ' weekend' : ''}${dayOfWeek % 2 ? ' highlight' : ''}`}
      >
        <TimePicker
          selected={this.isSelected}
          onSelect={this.handleSelect}
          onClick={this.handleClick}
          onBlur={this.handleBlur}
          onCommit={this.handleCommit}
          value={event[componentId]}
          isVisible={this.isVisible}
          id={monthIndex}
        />
      </div>
    )
  }
}
