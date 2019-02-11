import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { computed, observable } from 'mobx'

import Button from '../button'
import Fab from '../fab'

import Header from './header'
import displays from './displays'

import { columnData } from '../../constants'

const { listColumns } = columnData

const controlCol = listColumns.slice(0, 2)
const displayCol = listColumns.slice(2)
@inject('store')
@observer
class IndexPage extends Component {
  @computed
  get monthList() {
    const { months, selectedMonth } = this.props.store
    if (!months) return []
    const month = months.find(({ id }) => id === selectedMonth)
    return month || []
  }

  handleToClipboard = () => {}

  editDetail = async (payload, eventId) => {
    try {
      await this.props.store.editDetail(this.monthList.id, eventId, payload)
    } catch (error) {
      console.log(error)
    }
  }

  addDetail = async (payload) => {
    try {
      await this.props.store.addDetail(this.monthList.id, payload)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div className="list">
        {this.monthList.daysOfWeek && (
          <>
            <Header columns={listColumns} />
            {this.monthList.daysOfWeek.map((dayOfWeek, index) => {
              const events = this.monthList.events.filter(({ dayInMonth }) => dayInMonth === index)
              const weekend = dayOfWeek === 0 || dayOfWeek === 6
              return (
                <React.Fragment key={index.toString()}>
                  {controlCol.map(name => React.createElement(displays[name.id], {
                    key: name.id,
                    dayInMonth: index,
                    dayOfWeek,
                    weekend,
                    handleToClipboard: this.handleToClipboard,
                    events,
                  }))}
                  {events.length !== 0
                    ? events.map(event => displayCol.map(d => React.createElement(displays[d.id], {
                      key: d.id,
                      editDetail: this.editDetail,
                      addDetail: this.addDetail,
                      dayInMonth: index,
                      dayOfWeek,
                      monthId: this.monthList.id,
                      weekend,
                      handleToClipboard: this.handleToClipboard,
                      event,
                    })))
                    : displayCol.map(d => React.createElement(displays[d.id], {
                      key: d.id,
                      editDetail: this.editDetail,
                      addDetail: this.addDetail,
                      dayInMonth: index,
                      dayOfWeek,
                      monthId: this.monthList.id,
                      weekend,
                      handleToClipboard: this.handleToClipboard,
                    }))}
                  {dayOfWeek === 0 && (
                    <div className="weekSummary">WEEK SUMMARY GOES HERE MOIT</div>
                  )}
                </React.Fragment>
              )
            })}
          </>
        )}
        <style jsx global>
          {`
            .justFlex {
              display: flex;
            }

            .list {
              display: grid;
              grid-template-columns: repeat(5, auto) 3fr;
            }
            .list > div {
              padding: 10px;
              display: flex;
              align-items: center;
            }

            .header {
              margin-bottom: 10px;
            }

            .highlight {
              background-color: rgba(50, 50, 50, 0.1);
            }

            .day {
              grid-column-start: 1;
              grid-column-end: 2;
            }
            .add {
              grid-column-start: 2;
              grid-column-end: 3;
            }
            .start {
              grid-column-start: 3;
              grid-column-end: 4;
            }
            .end {
              grid-column-start: 4;
              grid-column-end: 5;
            }
            .hours {
              grid-column-start: 5;
              grid-column-end: 6;
            }
            .description {
              grid-column-start: 6;
              grid-column-end: 7;
            }

            .weekend {
              padding: 0px 10px !important;
              background-color: rgba(200, 255, 200, 0.3);
              grid-row-gap: 5px;
            }
            .weekSummary {
              grid-column-start: 1;
              grid-column-end: 7;
            }
          `}
        </style>
      </div>
    )
  }
}

export default IndexPage
