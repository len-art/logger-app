import React from 'react'
import { observer } from 'mobx-react'
import { observable, computed } from 'mobx'
import format from 'date-fns/format'

import { clockHelper } from '../../helpers'
import IconButton from '../iconButton'
import Back from '../../static/icons/back.svg'

@observer
export default class extends React.Component {
  @observable
  showEdit = false

  @observable
  showHours = true

  @observable
  radius = 0

  @observable
  hoverDegrees

  mouseIsInsideClock

  @observable
  selection = {
    hour: undefined,
    minute: undefined,
  }

  clockRef = React.createRef()

  constructor(props) {
    super(props)
    this.hours = clockHelper.createHours()
    this.minutes = clockHelper.createMinutes()
  }

  componentDidMount() {
    if (this.clockRef.current) {
      this.getRadius()
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selected && !this.props.selected) {
      this.mouseListen(false)
      this.props.onCommit()
    } else if (!prevProps.selected && this.props.selected) {
      this.mouseListen(true)
    }
  }

  @computed
  get selectedHourDeg() {
    if (this.selection.hour === undefined) return undefined
    /* round to nearest 30 */
    const round = Math.round(this.selection.hour / 30) * 30
    const minute = this.selection.minute === undefined ? this.hoverDegrees : this.selection.minute
    const minuteDegrees = (360 - minute + 90) % 360
    const addPercent = minuteDegrees / 360
    return round - 30 * addPercent
  }

  @computed
  get selectedMinuteDeg() {
    if (this.selection.minute === undefined) return undefined
    return Math.round(this.selection.minute / 6) * 6
  }

  @computed
  get isSelectionDone() {
    return Object.values(this.selection).every(v => v !== undefined)
  }

  normalizeDegrees = deg => (450 - deg) % 360

  getRadius = () => {
    this.radius = this.clockRef.current.offsetWidth / 2 - 20
  }

  toRad = deg => (deg * Math.PI) / 180

  toDeg = rad => (rad * 180) / Math.PI

  getX = (deg, isHours) => {
    let adjustedRadius = this.radius
    if (isHours && !this.showHours) adjustedRadius -= 30
    return Math.cos(this.toRad(deg)) * adjustedRadius
  }

  getY = (deg, isHours) => {
    let adjustedRadius = this.radius
    if (isHours && !this.showHours) adjustedRadius -= 30
    return Math.sin(this.toRad(deg)) * adjustedRadius
  }

  handleShowedit = () => {
    this.showEdit = !this.showEdit
    this.mouseListen(this.showEdit)
    if (!this.showEdit) this.props.onCommit()
  }

  mouseListen = (create) => {
    if (create) {
      document.addEventListener('mousemove', this.handleMouseMove)
      document.addEventListener('mousedown', this.handleMouseDown)
    } else {
      document.removeEventListener('mousemove', this.handleMouseMove)
      document.removeEventListener('mousedown', this.handleMouseDown)
      this.hoverDegrees = undefined
    }
  }

  handleMouseDown = () => {
    if (!this.mouseIsInsideClock) this.props.onBlur()
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
      this.mouseIsInsideClock = true
      this.handleClockHover({
        mx,
        my,
        left,
        top,
        width,
        height,
      })
    } else {
      this.hoverDegrees = undefined
      this.mouseIsInsideClock = false
    }
  }

  handleClockHover = ({
    mx, my, left, top, width, height,
  }) => {
    const cx = left + width / 2
    const cy = top + height / 2
    this.hoverDegrees = this.getTanDegrees({
      mx,
      my,
      cx,
      cy,
    })
  }

  getTanDegrees = ({
    mx, my, cx, cy,
  }) => {
    const [y, x] = [cy - my, mx - cx]
    return this.toDeg(Math.atan2(y, x))
  }

  showMinutes = () => {
    this.showHours = false
  }

  toggleShowHours = () => {
    // TODO: allow to click in the inner ring
    this.showHours = !this.showHours
    if (this.showHours) {
      this.selection.hour = undefined
      this.selection.minute = undefined
    }
  }

  handleClockClick = () => {
    if (this.showHours) {
      this.selection.hour = this.hoverDegrees
      this.showMinutes()
    } else {
      this.selection.minute = this.hoverDegrees
    }
    const { onSelect } = this.props
    if (this.isSelectionDone && typeof onSelect === 'function') {
      const hour = clockHelper.getHourFromDegrees(this.normalizeDegrees(this.selection.hour))
      const minute = clockHelper.getMinuteFromDegrees(this.normalizeDegrees(this.selection.minute))
      onSelect({ hour, minute })
    }
  }

  render() {
    const {
      onClick, onChange, value, radius = 125, onFocus, id, selected,
    } = this.props
    const inputValue = value ? format(value, 'HH:mm') : ''
    return (
      <div className="wrapper">
        <input
          type="text"
          onClick={onClick}
          onChange={onChange}
          readOnly
          onFocus={() => onFocus(id)}
          value={inputValue}
        />
        <div className={selected ? 'pickerWrapper visible' : 'pickerWrapper'}>
          {!this.showHours && (
            <IconButton
              Icon={Back}
              onClick={this.toggleShowHours}
              buttonStyles="position: absolute; left: 0; top: 0;"
            />
          )}
          {/* hours ring */}
          {/* eslint-disable-next-line */}
          <div onClick={this.handleClockClick} role="button" ref={this.clockRef} className="clock">
            {this.hours.map(h => (
              <button
                className={`hours${this.showHours ? '' : ' seeThrough'}`}
                key={h.h}
                style={{
                  transform: `translate(${this.getX(h.deg, true)}px, ${this.getY(h.deg, true)}px)`,
                }}
              >
                {h.h}
              </button>
            ))}
            {/* minutes ring */}
            {!this.showHours
              && this.minutes.map(m => (
                <button
                  className="hours smaller"
                  key={m.m}
                  style={{ transform: `translate(${this.getX(m.deg)}px, ${this.getY(m.deg)}px)` }}
                >
                  {m.m}
                </button>
              ))}
            {/* hover display */}
            {this.hoverDegrees !== undefined && (
              <div
                style={{ transform: `rotate(${-this.hoverDegrees}deg)` }}
                className={`hover${this.showHours ? '' : 'Minute'}`}
              />
            )}
            {/* selected hour display */}
            {this.selectedHourDeg !== undefined && (
              <div
                style={{
                  transform: `rotate(${-this.selectedHourDeg}deg)`,
                }}
                className="selectedHour"
              />
            )}
            {/* selected minute display */}
            {this.selectedMinuteDeg !== undefined && (
              <div
                style={{
                  transform: `rotate(${-this.selectedMinuteDeg}deg)`,
                }}
                className="selectedMinute"
              />
            )}
          </div>
        </div>
        <style jsx>
          {`
            .selectedHour:after {
              content: '';
              position: absolute;
              right: -26px;
              top: -13px;
              width: 26px;
              height: 26px;
              border-radius: 50%;
              background-color: var(--buttonBlue);
            }
            .hover,
            .hoverMinute,
            .selectedHour,
            .selectedMinute {
              position: absolute;
              left: 50%;
              height: 1px;
              opacity: 0.1;
              transform-origin: left;
              background-color: var(--buttonBlue);
            }
            .hover {
              width: calc(50% - 43px);
              height: 0px;
            }
            .selectedMinute,
            .hoverMinute {
              width: calc(50% - 39px);
            }
            .hoverMinute {
              height: 0px;
            }
            .selectedMinute {
              transition: 0.1s;
            }
            .selectedHour {
              width: calc(50% - 73px);
              transition: 0.1s;
            }

            .hover:after,
            .hoverMinute:after,
            .selectedMinute:after {
              content: '';
              position: absolute;
              border-radius: 50%;
            }
            .hover:after {
              right: -26px;
              top: -13px;
              width: 26px;
              height: 26px;
              background-color: var(--buttonBlue);
            }
            .hoverMinute:after,
            .selectedMinute:after {
              right: -18px;
              top: -9px;
              width: 18px;
              height: 18px;
              background-color: red;
            }
            .clock {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              background-color: rgba(40, 104, 221, 0.05);
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
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

            .hours:focus {
              outline: none;
            }

            .selected {
              background-color: #083b99;
            }
            .pickerWrapper {
              position: absolute;
              padding: 10px;
              bottom: -270px;
              left: 0;
              width: ${radius * 2}px;
              height: ${radius * 2}px;
              background: #fff;
              z-index: 10;
              box-shadow: 2px 3px 7px -1px rgba(50, 50, 50, 0.6);
              opacity: 0;
              z-index: -1000;
            }
            .visible {
              opacity: 1;
              z-index: 10;
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
              cursor: pointer;
            }
            input:focus {
              outline: none;
            }
            input:hover {
              background: rgba(34, 50, 84, 0.05);
            }

            .smaller {
              font-size: 0.8em;
            }
            .seeThrough {
              opacity: 0.3;
            }
          `}
        </style>
      </div>
    )
  }
}
