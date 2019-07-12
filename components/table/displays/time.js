import React from 'react'
import { observer } from 'mobx-react'
import { computed } from 'mobx'

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

  getDateFromTime = (i) => {
    if (!i.hour || i.minute) return undefined
    return setMinutes(
      setHours(setDate(this.props.startsAt, this.props.monthIndex + 1), i.hour),
      i.minute,
    )
  }

  handleSelect = (time) => {
    this.props.event[this.props.componentId] = this.getDateFromTime(time)
  }

  handleCommit = async (input = {}) => {
    const { editEvent, event, componentId } = this.props

    await editEvent({
      eventId: event.id,
      column: componentId,
      value: this.getDateFromTime(input),
    })
  }

  handleBlur = () => {
    this.props.handleColumnSelect()
  }

  handleClick = () => {
    const { handleColumnSelect, event, componentId } = this.props
    handleColumnSelect({ eventId: event.id, column: componentId })
  }

  handleDelete = () => {
    delete this.props.event[this.props.componentId]
    this.handleCommit({ hour: undefined, minute: undefined })
    // this.handleInputConfirm(e)
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
          handleDelete={this.handleDelete}
          value={event[componentId]}
          isVisible={this.isVisible}
          id={monthIndex}
        />
      </div>
    )
  }
}
