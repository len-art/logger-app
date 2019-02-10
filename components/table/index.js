import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { computed, observable } from 'mobx'

import Button from '../button'
import Fab from '../fab'

import Header from './header'
import displays from './displays'

import { columnData } from '../../constants'

const { listColumns } = columnData

@inject('store')
@observer
class IndexPage extends Component {
  @computed
  get monthList() {
    const { months, selectedMonth } = this.props.store
    if (!months) return []
    const month = months.find(({ id }) => id === selectedMonth)
    return month ? month.days : []
  }

  handleToClipboard = () => console.log('handleToClipboard')

  handleTestUpdateClick = () => {
    this.props.store.handleTestChange()
  }

  render() {
    return (
      <div className="list">
        {this.monthList.length > 0 && (
          <React.Fragment>
            <Header columns={listColumns} />
            {this.monthList.map(({ dayOfWeek }, index) => (
              <React.Fragment key={index.toString()}>
                {listColumns.map(name => React.createElement(displays[name.id], {
                  key: name.id,
                  dayOfMonth: index,
                  weekend: dayOfWeek % 7 === 0 || dayOfWeek % 7 === 6,
                  handleToClipboard: this.handleToClipboard,
                }))}
                {dayOfWeek === 0 && <div className="weekSummary">WEEK SUMMARY GOES HERE MOIT</div>}
              </React.Fragment>
            ))}
          </React.Fragment>
        )}
        <style jsx global>
          {`
            .justFlex {
              display: flex;
            }

            .list {
              display: grid;
              grid-template-columns: repeat(5, auto) 3fr;
              grid-template-areas:
                'header header header header header header'
                'day add start end hours description';
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
              grid-column-end: 7;
            }
          `}
        </style>
      </div>
    )
  }
}

export default IndexPage
