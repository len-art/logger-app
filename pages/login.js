import React from 'react'
import { inject, observer } from 'mobx-react'
import { computed, observable } from 'mobx'

import Input from '../components/input'

@inject('store')
@observer
export default class extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <div className="container">
          <h3>Login</h3>
          <Input label="User name" />
        </div>
        <style jsx>
          {`
            .wrapper {
              height: 100%;
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .container {
              max-width: 500px;
              max-height: 500px;
              height: 100%;
              width: 100%;
              border-radius: 10px;
              box-shadow: 0px 1px 4px -1px;
              padding: 20px;
            }
            h3 {
              text-align: center;
            }
          `}
        </style>
      </div>
    )
  }
}
