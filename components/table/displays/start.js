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

  handleChange = ({ minute, hour }) => {
    // TODO: create a date object
    const { startsAt, dayInMonth } = this.props
    const date = setMinutes(setHours(setDate(startsAt, dayInMonth + 1), hour), minute)
    this.inputValue = date
  }

  render() {
    const { weekend, dayOfWeek } = this.props
    return (
      <div className={`start${weekend ? ' weekend' : ''}${dayOfWeek % 2 ? ' highlight' : ''}`}>
        {dayOfWeek === 5 && <TimePicker onSelect={this.handleChange} value={this.inputValue} />}
      </div>
    )
  }
}
