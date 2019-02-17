import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

const hours = Array.from(new Array(12), (_, i) => i)

@observer
export default class extends React.Component {
  @observable
  showEdit = true

  ref = React.createRef()

  angleInRadians = deg => (deg * Math.PI()) / 180

  componentDidMount() {
    if (this.ref.current && this.props.autofocus) this.ref.current.focus()
  }

  handleShowedit = () => {
    this.showEdit = !this.showEdit
  }

  render() {
    const { onClick, onChange, value } = this.props
    return (
      <div className="wrapper">
        <input
          ref={this.ref}
          type="text"
          onClick={onClick}
          onChange={onChange}
          onBlur={this.handleShowedit}
          onFocus={this.handleShowedit}
          value={value}
        />
        <div className={this.showEdit ? 'pickerWrapper visible' : 'pickerWrapper'}>
          <div className="clock">
            {hours.map(h => (
              <button className={`time ${h}`}>{h}</button>
            ))}
          </div>
        </div>
        <style jsx>
          {`
            .clock {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              background-color: #aea;
              position: relative;
            }

            .time {
              position: absolute;
              top: 0;
              width: 30px;
              left: calc(50% - 15px);
              font-size: 1.2em;
              margin: auto;
            }
            .pickerWrapper {
              position: absolute;
              display: none;
              padding: 10px;
              bottom: -250px;
              left: 0;
              width: 250px;
              height: 250px;
              background: #fff;
              z-index: 10;
              box-shadow: 2px 3px 7px -1px rgba(50, 50, 50, 0.6);
            }
            .visible {
              display: block;
            }
            .wrapper {
              width: 100%;
              height: 100%;
              max-width: 60px;
              margin: 0;
              padding: 0;
              position: relative;
            }
            input {
              width: 100%;
              height: 100%;
              border: none;
              padding: 10px;
              background-color: inherit;
              box-sizing: border-box;
            }
            input:focus {
              outline: none;
            }
            input:hover {
              background: rgba(34, 50, 84, 0.05);
            }
          `}
        </style>
      </div>
    )
  }
}
