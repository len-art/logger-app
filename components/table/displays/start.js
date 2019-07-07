import React from 'react'
import { observer } from 'mobx-react'
import { observable, computed } from 'mobx'

import setDate from 'date-fns/setDate'
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'

import TimePicker from '../../timePicker'

@observer
export default class extends React.Component {
  @observable
  inputValue

  constructor(props) {
    super(props)
    const { id } = props
    if (props.event && props.event[id]) {
      this.inputValue = props.event[id]
    }
  }

  get isSelected() {
    const { selected, event } = this.props
    return selected.eventId === event.id && selected.column === 'start'
  }

  handleSelect = ({ minute, hour }) => {
    const { startsAt, monthIndex } = this.props
    const date = setMinutes(setHours(setDate(startsAt, monthIndex + 1), hour), minute)
    this.inputValue = date
  }

  handleCommit = async () => {
    const {
      editEvent, addEvent, event, id, monthIndex,
    } = this.props

    if (!this.inputValue) return

    if (event && event.createdAt) {
      await editEvent({ [id]: this.inputValue }, event.id)
    } else {
      await addEvent({ [id]: this.inputValue, dayInMonth: monthIndex })
    }
  }

  handleBlur = () => {
    this.props.handleColumnSelect()
  }

  handleClick = () => {
    const { handleColumnSelect, event } = this.props
    handleColumnSelect({ eventId: event.id, column: 'start' })
  }

  render() {
    const {
      weekend, monthIndex, dayOfWeek, event,
    } = this.props
    return (
      <div className={`start${weekend ? ' weekend' : ''}${dayOfWeek % 2 ? ' highlight' : ''}`}>
        <TimePicker
          onSelect={this.handleSelect}
          selected={this.isSelected}
          onClick={this.handleClick}
          onBlur={this.handleBlur}
          onCommit={this.handleCommit}
          value={this.isSelected ? this.inputValue : event.start}
          isVisible={this.isVisible}
          id={monthIndex}
        />
      </div>
    )
  }
}
