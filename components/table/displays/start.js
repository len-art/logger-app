import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

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
    if (props.event && props.event.start) {
      this.inputValue = props.event.start
    }
  }

  handleSelect = ({ minute, hour }) => {
    const { startsAt, dayInMonth } = this.props
    const date = setMinutes(setHours(setDate(startsAt, dayInMonth + 1), hour), minute)
    this.inputValue = date
  }

  handleCommit = async () => {
    const {
      editEvent, addEvent, event, dayInMonth,
    } = this.props
    if (!this.inputValue) return

    if (event && event.id) {
      await editEvent({ start: this.inputValue }, event.id)
    } else {
      await addEvent({ start: this.inputValue, dayInMonth })
    }
  }

  render() {
    const {
      event = {},
      weekend,
      dayOfWeek,
      selectedStart,
      handleSelectStart,
      handleUnselectStart,
      dayInMonth,
    } = this.props
    const isSelected = selectedStart === dayInMonth
    return (
      <div className={`start${weekend ? ' weekend' : ''}${dayOfWeek % 2 ? ' highlight' : ''}`}>
        <TimePicker
          onSelect={this.handleSelect}
          selected={isSelected}
          onFocus={handleSelectStart}
          onBlur={handleUnselectStart}
          onCommit={this.handleCommit}
          value={isSelected ? this.inputValue : event.start}
          isVisible={this.isVisible}
          id={dayInMonth}
        />
      </div>
    )
  }
}
