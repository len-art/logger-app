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
    const { id } = props
    if (props.event && props.event[id]) {
      this.inputValue = props.event[id]
    }
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

  handleFocus = () => {
    const { handleSelectStart, event, id } = this.props
    handleSelectStart(id, event.id)
  }

  handleBlur = () => {
    const { handleUnselectStart, id } = this.props
    handleUnselectStart(id)
  }

  render() {
    const {
      id, event = {}, weekend, dayOfWeek, selectedTimePicker, monthIndex,
    } = this.props
    const isSelected = event.id !== undefined && selectedTimePicker[id] === event.id

    return (
      <div className={`${id}${weekend ? ' weekend' : ''}${dayOfWeek % 2 ? ' highlight' : ''}`}>
        <TimePicker
          onSelect={this.handleSelect}
          selected={isSelected}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onCommit={this.handleCommit}
          value={isSelected ? this.inputValue : event[id]}
          isVisible={this.isVisible}
          id={monthIndex}
        />
      </div>
    )
  }
}
