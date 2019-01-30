import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { computed, observable } from 'mobx'
import { startOfMonth, getDaysInMonth } from 'date-fns'

import Button from '../components/button'

import { columnData } from '../constants'

const { columns } = columnData

@inject('store')
@observer
class IndexPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      raiseError: false,
    }
  }

  @observable
  isDropdownOpen = false

  @computed
  get monthList() {
    const { selectedMonth } = this.props.store
    // TODO: take selected month into consideration here
    const month = startOfMonth(new Date())
    const startDay = month.getDay()
    return Array.from(new Array(getDaysInMonth(month)), (_, i) => {
      const day = (startDay + i) % 7
      return day
    })
  }

  componentDidUpdate() {
    if (this.state.raiseError) {
      throw new Error('Houston, we have a problem')
    }
  }

  handleDropdown = () => (this.isDropdownOpen = !this.isDropdownOpen)

  handleProj = () => console.log('handleProj')

  handleStart = () => console.log('handleStart')

  handleEnd = () => console.log('handleEnd')

  handleToClipboard = () => console.log('handleToClipboard')

  handleTestUpdateClick = () => {
    this.props.store.handleTestChange()
  }

  raiseError = () => {
    this.setState({ raiseError: true })
  }

  render() {
    const { projects, selectedProject, setSelectedProject } = this.props.store
    return (
      <div>
        <h1>Work logger</h1>
        <p>Log your work hours</p>
        <div>
          <h2>Projects</h2>
          <div className="justFlex tabs">
            {/* TODO: if project list is too long move last ones to a dropdown menu */}
            {projects.map((p, index) => (
              <Button onClick={this.handleProj} text={p} key={index.toString()} />
            ))}
          </div>
        </div>
        <div className="justFlex">
          {/* buttons */}
          <Button onClick={this.handleStart} text="Start work day" />
          <Button onClick={this.handleEnd} text="End" />
        </div>
        <div>
          <div className="list">
            {columns.map(name => (
              <div key={name} className={name}>
                {name}
              </div>
            ))}
            {this.monthList.map((day, index) => (
              <React.Fragment key={index.toString()}>
                {columns.map((name, i) => (
                  <div
                    key={name}
                    className={`${name} ${day % 7 === 0 || day % 7 === 6 ? 'weekend' : ''}`}
                  >
                    {i === 0 && index + 1}
                    {name === 'details' && (
                      <Button onClick={this.handleToClipboard} text="To clipboard" />
                    )}
                  </div>
                ))}
                {day === 0 && <div className="weekSummary">WEEK SUMMARY GOES HERE MOIT</div>}
              </React.Fragment>
            ))}
          </div>
        </div>
        <style jsx>
          {`
            .justFlex {
              display: flex;
            }
            .list {
              display: grid;
              grid-template-columns: repeat(4, 0.5fr) 3fr;
              grid-template-areas: 'day start end hours description';
              grid-column-gap: 10px;
              grid-row-gap: 10px;
            }
            .list > div {
              padding: 10px;
              background-color: #eee;
            }

            .weekend {
              padding: 0px 10px !important;
              background-color: transparent !important;
              grid-row-gap: 5px;
            }
            .weekSummary {
              grid-column-start: 1;
              grid-column-end: 6;
            }
            .tabs {
            }
          `}
        </style>
      </div>
    )
  }
}

export default IndexPage
