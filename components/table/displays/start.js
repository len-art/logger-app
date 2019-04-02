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
    const { monthList, monthIndex } = this.props
    const date = setMinutes(setHours(setDate(monthList.startsAt, monthIndex + 1), hour), minute)
    console.log(minute, hour)
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

  handleClick = () => {
    const {
      handleSelect, monthIndex, event, id, empty, selectEmptyField,
    } = this.props
    if (empty) {
      selectEmptyField(id, monthIndex)
    } else handleSelect(id, event.id)
  }

  handleBlur = () => {
    const {
      empty, id, handleUnselect, unselectEmptyField,
    } = this.props
    if (empty) {
      unselectEmptyField(id)
    } else handleUnselect(id)
  }

  get isSelected() {
    const {
      id, event = {}, selectedTimePicker, monthIndex, selectedEmptyField, empty,
    } = this.props
    if (empty) {
      return selectedEmptyField[id] === monthIndex
    }
    return event.id !== undefined && selectedTimePicker[id] === event.id
  }

  render() {
    const {
      id, event = {}, weekend, dayOfWeek, selectedTimePicker, monthIndex,
    } = this.props
    // const isSelected = event.id !== undefined && selectedTimePicker[id] === event.id

    return (
      <div className={`${id}${weekend ? ' weekend' : ''}${dayOfWeek % 2 ? ' highlight' : ''}`}>
        <TimePicker
          onSelect={this.handleSelect}
          selected={this.isSelected}
          onClick={this.handleClick}
          onBlur={this.handleBlur}
          onCommit={this.handleCommit}
          value={this.isSelected ? this.inputValue : event[id]}
          isVisible={this.isVisible}
          id={monthIndex}
        />
      </div>
    )
  }
}
