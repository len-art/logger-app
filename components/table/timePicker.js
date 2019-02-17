import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

// TODO: make this readable
const hours = Array.from(new Array(12), (_, i) => {
  const deg = (360 - i * 30) % 360
  // const h = (12 + 3 - i + 1) % 12
  const h = i
  return { h, deg }
})
console.log(hours)

@observer
export default class extends React.Component {
  @observable
  showEdit = true

  clockRef = React.createRef()

  inRad = deg => (deg * Math.PI) / 180

  componentDidMount() {
    this.radius = this.clockRef.current ? this.clockRef.current.offsetWidth / 2 : 0
  }

  getX = deg => Math.cos(this.inRad(deg)) * this.radius

  getY = deg => Math.sin(this.inRad(deg)) * this.radius

  handleShowedit = () => {
    this.showEdit = !this.showEdit
  }

  render() {
    const { onClick, onChange, value } = this.props
    return (
      <div className="wrapper">
        <input
          type="text"
          onClick={onClick}
          onChange={onChange}
          onBlur={this.handleShowedit}
          onFocus={this.handleShowedit}
          value={value}
        />
        <div className={this.showEdit ? 'pickerWrapper visible' : 'pickerWrapper'}>
          <div ref={this.clockRef} className="clock">
            {hours.map(h => (
              <button
                className="time"
                key={h.h}
                style={{ transform: `translate(${this.getX(h.deg)}px, ${this.getY(h.deg)}px)` }}
              >
                {h.h}
              </button>
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
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .time {
              position: absolute;
              width: 30px;
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
