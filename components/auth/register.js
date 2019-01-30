import React from 'react'
import { inject, observer } from 'mobx-react'
import { computed, observable } from 'mobx'

import Input from '../input'
import Button from '../button'

const inputFields = [
  {
    label: 'E-mail',
    field: 'email',
    type: 'email',
    onLogin: true,
  },
  {
    label: 'User Name',
    field: 'userName',
    type: 'text',
    onLogin: false,
  },
  {
    label: 'Password',
    field: 'password',
    type: 'password',
    onLogin: true,
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
      <div className="register">
        <h3>Register</h3>
        {inputFields.map(({ label, field, type }) => (
          <Input
            key={field}
            className="margined"
            label={label}
            value={this[field]}
            type={type}
            onChange={e => this.handleInputChange(e, field)}
          />
        ))}
        <Button onClick={this.handleLogin} text="Login" />
        <style jsx>
          {`
            .register {
              display: flex;
              flex-direction: column;
              box-shadow: 0px 1px 4px -1px;
              border-radius: 5px;
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
