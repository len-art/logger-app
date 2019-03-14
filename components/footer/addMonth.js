import React from 'react'
import { inject, observer } from 'mobx-react'
import isSameMonth from 'date-fns/isSameMonth'
import Fab from '../fab'

@inject('store')
@observer
class AddMonth extends React.Component {
  createMonth = () => {
    const projectId = this.props.store.selectedProject
    const dayInMonth = new Date()
    return this.props.store.createMonth(projectId, dayInMonth)
  }

  checkIsSameMonth = () => this.props.store.months.some(month => isSameMonth(new Date(), month.startsAt))

  render() {
    if (!this.checkIsSameMonth()) {
      return <Fab onClick={this.createMonth} />
    }
    return null
  }
}

export default AddMonth
