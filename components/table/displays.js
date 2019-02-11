import React from 'react'
import { inject, observer } from 'mobx-react'
import { computed, observable } from 'mobx'

import Button from '../button'
import IconButton from '../iconButton'

import TextInput from './textInput'
import Edit from '../../static/icons/edit.svg'

const Day = ({ weekend, dayInMonth }) => (
  <div className={`day${weekend ? ' weekend' : ''}`}>{dayInMonth}</div>
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

  handleInputConfirm = async (e) => {
    const { event, dayInMonth } = this.props
    e.preventDefault()
    if (event) {
      await this.props.editDetail({ details: this.inputValue }, event.id)
    } else {
      await this.props.addDetail({ details: this.inputValue, dayInMonth })
    }
    this.showEdit = false
  }

  render() {
    const { weekend } = this.props
    return (
      <div className={`details${weekend ? ' weekend' : ''}`}>
        <div className="edit">
          {this.showEdit ? (
            <IconButton onClick={this.handleInputConfirm} text="✓" />
          ) : (
            <IconButton Icon={Edit} onClick={this.handleShowEdit} />
          )}
        </div>
        {this.showEdit ? (
          <form className="input" onSubmit={this.handleInputConfirm}>
            <TextInput onChange={this.handleInputChange} value={this.inputValue} />
            <Button unstyled onClick={this.handleInputCancel} text="✗" />
          </form>
        ) : (
          <div className="input">{this.inputValue}</div>
        )}
        <div className={`clipboard${this.showEdit ? ' hidden' : ''}`}>cp</div>
        <style jsx>
          {`
            .details {
              display: grid;
              grid-template-columns: 0fr 3fr 0fr;
              grid-template-areas: 'edit input clipboard';
              align-items: center;
              overflow: hidden;
            }
            .details:hover .clipboard:not(.hidden) {
              transform: translateX(0px);
              transition-delay: 0.25s;
            }
            form {
              display: flex;
            }
            .clipboard {
              transform: translateX(30px);
              transition: 0.25s;
              transition-delay: 0s;
            }
            .edit {
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
