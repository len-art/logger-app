import React from 'react'
import { inject, observer } from 'mobx-react'
import format from 'date-fns/format'
import Fab from '../fab'

@inject('store')
@observer
class AddMonth extends React.Component {
  createMonth = () => {
    const projectId = this.props.store.selectedProject
    const dayInMonth = new Date()
    this.props.store.createMonth(projectId, dayInMonth)
    console.log(this.props.store.selectedMonth)
    // try {
    //   this.error = undefined
    //   this.isLoading = true
    //   const projectId = this.props.store.selectedProject
    //   const dayInMonth = new Date()
    //   await this.props.store.createMonth({ projectId, dayInMonth })
    // } catch (error) {
    //   console.error(error)
    //   if (error.response.data) {
    //     this.error = error.response.data
    //   }
    // } finally {
    //   this.isLoading = false
    // }
  }

  checkIsSameMonth = () => {
    const dayInMonth = new Date()
    props.store.months.some((month) => {
      month.startsAt === dayInMonth.startsAt
    })
  }

  render() {
    // create another method for true/false current month. if current month false(doesn't exist) than return plus button, else empty component
    return <Fab onClick={this.createMonth} />
  }
}

export default AddMonth
