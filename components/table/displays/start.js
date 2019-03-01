import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import TimePicker from '../../timePicker'

@observer
export default class extends React.Component {
  @observable
  inputTime

  handleChange = ({ minute, hour }) => {
    // TODO: format to time (maybe two inputs?)
    console.log(minute, hour)
  }

  render() {
    const { weekend, dayOfWeek, event = {} } = this.props
    return (
      <div className={`start${weekend ? ' weekend' : ''}${dayOfWeek % 2 ? ' highlight' : ''}`}>
        {dayOfWeek === 5 && (
          <TimePicker
            onSelect={this.handleChange}
            value={this.showEdit ? this.inputTime : event.detals}
          />
        )}
      </div>
    )
  }
}
