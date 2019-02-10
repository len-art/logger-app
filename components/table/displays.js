import React from 'react'
import { inject, observer } from 'mobx-react'
import { computed, observable } from 'mobx'

import Button from '../button'
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
  constructor(props) {
    super(props)
    if (props.event && props.event.details) {
      this.inputValue = props.event.details
    }
  }

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

  handleInputCancel = () => {
    console.log('blur')
    this.showEdit = false
    const { event } = this.props
    if (event && event.details) {
      this.inputValue = event.details
    }
  }

  handleInputConfirm = (e) => {
    console.log('confirm')
    e.preventDefault()
    this.showEdit = false
  }

  render() {
    const { weekend, event } = this.props
    return (
      <div className={`details${weekend ? ' weekend' : ''}`}>
        {/* TODO: use form element for enter,
        show detail description here,
        display copy button only when something to copy and not editing */}
        {!this.showEdit && <IconButton Icon={Edit} onClick={this.handleShowEdit} />}
        {/* {event && event.details && <div className="text">{event.details}</div>} */}
        {this.showEdit ? (
          <form onSubmit={this.handleInputConfirm}>
            <TextInput onChange={this.handleInputChange} value={this.inputValue} />
            <Button unstyled onClick={this.handleInputCancel} text="✗" />
          </form>
        ) : (
          this.inputValue && <div className="text">{this.inputValue}</div>
        )}
        <div className="clipboard">cp</div>
        <style jsx>
          {`
            .details {
              padding-right: 20px;
              position: relative;
              overflow: hidden;
              display: flex;
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
