import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { computed, observable, action } from 'mobx'

import Paper from '../paper'
import Header from './header'
import displays from './displays'

import { columnData } from '../../constants'

const { listColumns } = columnData

// TODO: do we still need this?
// const controlCol = listColumns.slice(0, 2)
// const displayCol = listColumns.slice(2)

@inject('store')
@observer
class Table extends Component {
  @observable
  selected = {
    eventId: undefined,
    column: undefined,
  }

  @computed
  get monthList() {
    const { months, selectedMonth } = this.props.store
    if (!months) return []
    const month = months.find(({ id }) => id === selectedMonth)
    return month || []
  }

  @action
  handleColumnSelect = (
    selected = {
      start: undefined,
      end: undefined,
    },
  ) => {
    /* selected?: { eventId, column } */
    this.selected = selected
  }

  addEvent = async (payload) => {
    try {
      await this.props.store.addEvent(this.monthList.id, payload)
    } catch (error) {
      console.log(error)
    }
  }

  editEvent = async ({ eventId, column, value }) => {
    try {
      await this.props.store.editEvent(this.monthList.id, eventId, {
        [column]: value,
      })
    } catch (error) {
      console.log(error)
    }
  }

  deleteEvent = async ({ eventId }) => {
    try {
      await this.props.store.deleteEvent(this.monthList.id, eventId)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <Paper>
        <div className="list">
          {this.monthList.daysOfWeek && (
            <>
              <Header columns={listColumns} />
              {this.monthList.daysOfWeek.map((dayOfWeek, monthIndex) => {
                const weekend = dayOfWeek === 0 || dayOfWeek === 6
                const events = this.monthList.events.filter(
                  ({ dayInMonth }) => dayInMonth === monthIndex,
                )
                const monthData = {
                  weekend,
                  monthIndex,
                  dayOfWeek,
                  startsAt: this.monthList.startsAt,
                }
                return (
                  <React.Fragment key={monthIndex.toString()}>
                    <displays.day {...monthData} />
                    {events.map((e, eventIndex) => {
                      const props = {
                        ...monthData,
                        selected: this.selected,
                        event: e,
                        eventIndex,
                        handleColumnSelect: this.handleColumnSelect,
                        editEvent: this.editEvent,
                        addEvent: this.addEvent,
                        deleteEvent: this.deleteEvent,
                      }
                      return (
                        <React.Fragment key={e.id}>
                          <displays.add {...props} />
                          <displays.start {...props} componentId="start" />
                          <displays.end {...props} componentId="end" />
                          <displays.hours {...props} componentId="hours" />
                          <displays.details {...props} componentId="details" />
                        </React.Fragment>
                      )
                    })}
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
                background-color: rgba(150, 150, 250, 0.3);
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
