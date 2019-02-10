import React from 'react'
import { inject, observer } from 'mobx-react'
import { computed, observable } from 'mobx'

import IconButton from '../iconButton'

import TextInput from './textInput'
import Edit from '../../static/icons/edit.svg'

const Day = ({ weekend, dayOfMonth }) => (
  <div className={`day${weekend ? ' weekend' : ''}`}>{dayOfMonth}</div>
)

const Add = ({ weekend }) => <div className={`add${weekend ? ' weekend' : ''}`}>+</div>

const Start = ({ weekend }) => <div className={`start${weekend ? ' weekend' : ''}`} />

const End = ({ weekend }) => <div className={`end${weekend ? ' weekend' : ''}`} />

const Hours = ({ weekend }) => <div className={`hours${weekend ? ' weekend' : ''}`} />

@observer
class Details extends React.Component {
  @observable
  showEdit = false

  @observable
  inputValue = ''

  handleShowEdit = () => {
    this.showEdit = !this.showEdit
  }

  handleInputChange = (e) => {
    this.inputValue = e.target.value
  }

  render() {
    const { weekend, events } = this.props
    return (
      <div className={`details${weekend ? ' weekend' : ''}`}>
        {/* TODO: show detail description here,
        display copy button only when something to copy and not editing */}
        {this.showEdit ? (
          <TextInput onChange={this.handleInputChange} value={this.inputValue} />
        ) : (
          <IconButton Icon={Edit} onClick={this.handleShowEdit} />
        )}
        <div className="clipboard">cp</div>
        <style jsx>
          {`
            .details {
              padding-right: 20px;
              position: relative;
              overflow: hidden;
            }
            .details:hover .clipboard {
              transform: translateX(0px);
              transition-delay: 0.25s;
            }
            .clipboard {
              position: absolute;
              right: 0;
              top: 0;
              bottom: 0;
              margin: auto;
              transform: translateX(20px);
              transition: 0.25s;
              transition-delay: 0s;
            }
          `}
        </style>
      </div>
    )
  }
}

export default {
  day: Day,
  add: Add,
  start: Start,
  end: End,
  hours: Hours,
  details: Details,
}