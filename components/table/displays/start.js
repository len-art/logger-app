import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import TimePicker from '../../timePicker'

@observer
export default class extends React.Component {
  @observable
  inputTime

  handleChange = ({ target: { value } }) => {
    // TODO: format to time (maybe two inputs?)
    this.inputTime = value
  }

  render() {
    const { weekend, dayOfWeek, event = {} } = this.props
    return (
      <div className={`start${weekend ? ' weekend' : ''}${dayOfWeek % 2 ? ' highlight' : ''}`}>
        {dayOfWeek === 5 && (
          <TimePicker
            onChange={this.handleChange}
            value={this.showEdit ? this.inputTime : event.detals}
          />
        )}
      </div>
    )
  }
}
