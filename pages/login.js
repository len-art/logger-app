import React from 'react'
import { inject, observer } from 'mobx-react'
import { computed, observable } from 'mobx'

import Input from '../components/input'

const inputFields = [
  {
    label: 'E-mail',
    field: 'email',
  },
  {
    label: 'User Name',
    field: 'userName',
  },
  {
    label: 'Password',
    field: 'password',
  },
]

@inject('store')
@observer
export default class extends React.Component {
  @observable
  email = ''

  @observable
  userName = ''

  @observable
  password = ''

  handleInputChange = (e, field) => {
    this[field] = e.target.value
  }

  render() {
    return (
      <div className="wrapper">
        <div className="container">
          <h3>Login</h3>
          {inputFields.map(({ label, field }) => (
            <Input
              key={field}
              className="margined"
              label={label}
              value={this[field]}
              onChange={e => this.onChange(e, field)}
            />
          ))}
          {/* <Input className="margined" label="e-mail" value />
          <Input className="margined" label="User name" />
          <Input className="margined" label="Password" /> */}
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
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
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
