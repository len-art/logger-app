import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import IconButton from '../../iconButton'
import CopyIcon from '../../../static/icons/copyIcon.svg'

import TextInput from '../textInput'

@observer
export default class extends React.Component {
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
    const { event } = this.props
    if (event && event.details) {
      this.inputValue = event.details
    }
  }

  handleInputChange = (e) => {
    this.inputValue = e.target.value
  }

  handleInputCancel = () => {
    this.showEdit = false
    const { event } = this.props
    if (event && event.details) {
      this.inputValue = event.details
    }
  }

  handleInputConfirm = async (e) => {
    e.preventDefault()

    const {
      event, editEvent, addEvent, dayInMonth,
    } = this.props

    if (event && event.id) {
      /* event exists, send changes */
      await editEvent({ details: this.inputValue }, event.id)
    } else if (this.inputValue.length) {
      /* event doesn't exist yet and user inputs text */
      await addEvent({ details: this.inputValue, dayInMonth })
    }

    this.showEdit = false
  }

  handleDelete = (e) => {
    this.inputValue = ''
    this.handleInputConfirm(e)
  }

  copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(this.inputValue)
    } catch (error) {
      console.error(`Failed to copy to clipboard: ${error}`)
    }
  }

  render() {
    const { weekend, dayOfWeek, event = {} } = this.props
    return (
      <div className={`details${weekend ? ' weekend' : ''}${dayOfWeek % 2 ? ' highlight' : ''}`}>
        <div className="edit">
          {this.showEdit ? (
            <IconButton onClick={this.handleInputConfirm} text="✓" />
          ) : (
            <IconButton onClick={this.handleDelete} text="✗" />
          )}
        </div>
        <form className="input" onSubmit={this.handleInputConfirm}>
          <TextInput
            onFocus={this.handleShowEdit}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            value={this.showEdit ? this.inputValue : event.details}
          />
        </form>
        <div className={`clipboard${this.showEdit || !event.details ? ' hidden' : ''}`}>
          <IconButton onClick={this.copyToClipboard} Icon={CopyIcon} />
        </div>
        <style jsx>
          {`
            .details {
              display: grid;
              grid-template-columns: 0fr 3fr 0fr;
              grid-template-areas: 'edit input clipboard';
              align-items: center;
              overflow: hidden;
              padding: 0;
            }
            .details:hover .clipboard:not(.hidden) {
              transform: translateX(0px);
              transition-delay: 0.25s;
            }
            form {
              display: flex;
              height: 100%;
            }
            .clipboard {
              transform: translateX(30px);
              transition: 0.25s;
              transition-delay: 0s;
              position: absolute;
              right: 0;
            }
            .edit {
            }
          `}
        </style>
      </div>
    )
  }
}
