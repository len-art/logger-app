import React from 'react'

import Fab from '../fab'

class AddMonth extends React.Component {
  createMonth = () => {
    console.log('callMonthsCreate')
  }

  render() {
    // create another method for true/false current month. if current month false(doesn't exist) than return plus button, else empty component
    return <Fab onClick={this.createMonth} />
  }
}

export default AddMonth
