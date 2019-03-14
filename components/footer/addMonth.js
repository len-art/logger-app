import React from 'react'
import { inject, observer } from 'mobx-react'
import startOfMonth from 'date-fns/startOfMonth'
import isSameMonth from 'date-fns/isSameMonth'
import Fab from '../fab'

@inject('store')
@observer
class AddMonth extends React.Component {
  // createMonth = () => {
  //   const projectId = this.props.store.selectedProject
  //   const dayInMonth = new Date()
  //   this.props.store.createMonth(projectId, dayInMonth)
  //   console.log(this.props.store.months)
  // }

  checkIsSameMonth = () => {
    const dayInMonth = new Date()
    console.log(
      this.props.store.months.some((month) => {
        console.log(dayInMonth)
        console.log(month.startsAt)
        isSameMonth(
          new Date('Thu Mar 14 2019 12:58:33 GMT+0100 (Central European Standard Time)'),
          new Date('Fri Mar 01 2019 01:00:00 GMT+0100 (Central European Standard Time)'),
        )
      }),
    )
  }

  render() {
    // create another method for true/false current month. if current month false(doesn't exist) than return plus button, else empty component
    return <Fab onClick={this.checkIsSameMonth} />
  }
}

export default AddMonth
