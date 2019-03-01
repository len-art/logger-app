import React from 'react'
import { observer } from 'mobx-react'
import { observable, computed, reaction } from 'mobx'

const hours = Array.from(new Array(12), (_, i) => {
  /* shift 90 degrees so positions start at the top */
  const deg = (270 - i * 30) % 360
  /* reverse hours for easier calcuation */
  const h = 12 - i
  return { h, deg }
})

@observer
export default class extends React.Component {
  @observable
  showEdit = true

  @observable
  radius = 0

  @observable
  hoverDegrees

  clockRef = React.createRef()

  componentDidMount() {
    if (this.clockRef.current) {
      this.getRadius()
    }
    // TODO: remove after developing
    document.addEventListener('mousemove', this.handleMouseMove)
  }

  getRadius() {
    this.radius = this.clockRef.current.offsetWidth / 2 - 20
  }

  toRad = deg => (deg * Math.PI) / 180

  toDeg = rad => (rad * 180) / Math.PI

  getX = deg => Math.cos(this.toRad(deg)) * this.radius

  getY = deg => Math.sin(this.toRad(deg)) * this.radius

  handleShowedit = () => {
    this.showEdit = !this.showEdit
    this.mouseListen(this.showEdit)
  }

  mouseListen = (create) => {
    if (create) {
      document.addEventListener('mousemove', this.handleMouseMove)
    } else {
      document.removeEventListener('mousemove', this.handleMouseMove)
      this.hoverDegrees = undefined
    }
  }

  handleMouseMove = (e) => {
    if (!this.clockRef.current) return
    const { clientX: mx, clientY: my } = e
    const {
      left,
      right,
      top,
      bottom,
      width,
      height,
    } = this.clockRef.current.getBoundingClientRect()

    if (mx >= left && mx <= right && my >= top && my <= bottom) {
      this.handleClockHover({
        mx,
        my,
        left,
        top,
        width,
        height,
      })
    }
  }

  handleClockHover = ({
    mx, my, left, top, width, height,
  }) => {
    const cx = left + width / 2
    const cy = top + height / 2
    this.hoverDegrees = this.getHoverDegrees({
      mx,
      my,
      cx,
      cy,
    })
  }

  getHoverDegrees = ({
    mx, my, cx, cy,
  }) => {
    const [y, x] = [cy - my, mx - cx]
    const deg = this.toDeg(Math.atan2(y, x))
    return deg
  }

  render() {
    const {
      onClick, onChange, value, radius = 125,
    } = this.props
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
                className="hours"
                key={h.h}
                style={{ transform: `translate(${this.getX(h.deg)}px, ${this.getY(h.deg)}px)` }}
              >
                {h.h}
              </button>
            ))}
            {this.hoverDegrees !== undefined && (
              <div style={{ transform: `rotate(${-this.hoverDegrees}deg)` }} className="hover" />
            )}
          </div>
        </div>
        <style jsx>
          {`
            .hover {
              position: absolute;
              left: 50%;
              width: calc(50% - 43px);
              height: 1px;
              background-color: var(--buttonBlue);
              opacity: 0.1;
              transform-origin: left;
            }
            .hover:after {
              content: '';
              position: absolute;
              right: -26px;
              top: -13px;
              width: 26px;
              height: 26px;
              border-radius: 50%;
              background-color: var(--buttonBlue);
            }
            .clock {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              background-color: rgba(170, 238, 170, 0.3);
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .hours {
              position: absolute;
              border-radius: 50%;
              width: 30px;
              height: 30px;
              font-size: 0.9em;
              text-align: center;
              color: #888;
              margin: auto;
              padding: 0;
              z-index: 1;
            }

            .selected {
              background-color: #083b99;
            }
            .pickerWrapper {
              position: absolute;
              display: none;
              padding: 10px;
              bottom: -250px;
              left: 0;
              width: ${radius * 2}px;
              height: ${radius * 2}px;
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
