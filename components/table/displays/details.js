import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import IconButton from '../../iconButton'
import CopyIcon from '../../../static/icons/copyIcon.svg'

import TextInput from '../textInput'

@observer
export default class extends React.Component {
  @observable
  showEdit = false

  handleShowEdit = () => {
    this.showEdit = !this.showEdit
  }

  handleInputChange = (e) => {
    this.props.event.details = e.target.value
  }

  handleSave = async (value) => {
    if (!value) {
      this.handleShowEdit()
      return
    }
    const { event, editEvent, componentId } = this.props

    await editEvent({ eventId: event.id, column: componentId, value })
    this.showEdit = false
  }

  handleDelete = (e) => {
    delete this.props.event.details
    this.handleInputConfirm(e)
  }

  copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(this.props.event.details)
      // TODO: when this completes, show a checkmark for a couple of seconds
    } catch (error) {
      console.error(`Failed to copy to clipboard: ${error}`)
    }
  }

  handleFormConfirm = (e) => {
    e.preventDefault()
    const val = e.target.elements.details.value
    this.handleSave(val)
  }

  handleInputConfirm = (e) => {
    const val = e.target.value
    this.handleSave(val)
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
        <form className="input" onSubmit={this.handleFormConfirm}>
          <TextInput
            onFocus={this.handleShowEdit}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            value={event.details}
            name="details"
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
