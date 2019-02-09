import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { computed, observable } from 'mobx'

import Button from '../components/button'
import Projects from '../components/projects'
import Table from '../components/table'

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

  componentDidUpdate() {
    if (this.state.raiseError) {
      throw new Error('Houston, we have a problem')
    }
  }

  handleDropdown = () => (this.isDropdownOpen = !this.isDropdownOpen)

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
    return (
      <div>
        <h1>Work logger</h1>
        <p>Log your work hours</p>
        <Projects />
        <div className="justFlex">
          <Button onClick={this.handleStart} text="Start work day" />
          <Button onClick={this.handleEnd} text="End" />
        </div>
        <div>
          <Table />
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
          `}
        </style>
      </div>
    )
  }
}

export default IndexPage
