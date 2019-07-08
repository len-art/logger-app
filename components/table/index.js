import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { computed, observable } from 'mobx'
import isSameMonth from 'date-fns/isSameMonth'

import Paper from '../paper'
import Header from './header'
import displays from './displays'

import { columnData } from '../../constants'

const { listColumns } = columnData

const controlCol = listColumns.slice(0, 2)
const displayCol = listColumns.slice(2)

@inject('store')
@observer
class Table extends Component {
  @observable
  selectedTimePicker = {
    start: undefined,
    end: undefined,
  }

  @computed
  get monthList() {
    const { months, selectedMonth } = this.props.store
    if (!months) return []
    const month = months.find(({ id }) => id === selectedMonth)
    const now = new Date()
    if (!isSameMonth(now, month.startsAt)) return month || []
    return { ...month, daysOfWeek: month.daysOfWeek.slice(0, now.getDate()) }
  }

  handleToClipboard = () => {}

  editEvent = async (payload, eventId) => {
    try {
      await this.props.store.editEvent(this.monthList.id, eventId, payload)
    } catch (error) {
      console.log(error)
    }
  }

  addEvent = async (payload) => {
    try {
      await this.props.store.addEvent(this.monthList.id, payload)
    } catch (error) {
      console.log(error)
    }
  }

  addLocalDetail = (dayInMonth) => {
    const exists = this.monthList.events.find(e => e.dayInMonth === dayInMonth)
    if (exists) this.monthList.events.push({ dayInMonth })
  }

  handleSelectStart = (field, eventId) => {
    this.selectedTimePicker[field] = eventId
  }

  handleUnselectStart = (field) => {
    this.selectedTimePicker[field] = undefined
  }

  render() {
    return (
      <Paper>
        <div className="list">
          {this.monthList.daysOfWeek && (
            <>
              <Header columns={listColumns} />
              {this.monthList.daysOfWeek.map((dayOfWeek, monthIndex) => {
                const filteredEvents = this.monthList.events.filter(
                  ({ dayInMonth }) => dayInMonth === monthIndex,
                )

                const events = filteredEvents.length ? filteredEvents : [{ id: monthIndex }]
                const weekend = dayOfWeek === 0 || dayOfWeek === 6
                return events.map((event, eventIndex) => listColumns.map(col => React.createElement(displays[col.id], {
                  key: col.id,
                  id: col.id,
                  dayOfWeek,
                  event,
                  eventIndex,
                  events,
                  monthIndex,
                  weekend,
                  addEvent: this.addEvent,
                  editEvent: this.editEvent,
                  addLocalDetail: this.addLocalDetail,
                  handleSelectStart: this.handleSelectStart,
                  handleToClipboard: this.handleToClipboard,
                  handleUnselectStart: this.handleUnselectStart,
                  monthId: this.monthList.id,
                  selectedTimePicker: this.selectedTimePicker,
                  startsAt: this.monthList.startsAt,
                })))
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
                display: flex;
                align-items: center;
              }

              .header {
                margin: 10px 0;
                opacity: 0.7;
              }

              .highlight {
                background-color: rgba(140, 140, 160, 0.1);
              }

              .day,
              .add,
              .hours {
                padding: 15px;
              }

              .day {
                grid-column-start: 1;
                grid-column-end: 2;
              }
              .add {
                grid-column-start: 2;
                grid-column-end: 3;
              }
              .add button {
                border: none;
                padding: 5px;
                margin: 0;
                background: none;
                cursor: pointer;
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
              .details {
                grid-column-start: 6;
                grid-column-end: 7;
                position: relative;
              }

              .weekend {
                padding: 0px 15px;
                background-color: rgba(200, 200, 220, 0.3);
                font-size: 0.9em;
                grid-row-gap: 5px;
              }
              .weekSummary {
                grid-column-start: 1;
                grid-column-end: 7;
                padding: 10px 15px;
                border-bottom: 2px solid #aaa;
              }
            `}
          </style>
        </div>
      </Paper>
    )
  }
}

export default Table
