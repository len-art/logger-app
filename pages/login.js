import React from 'react'
import { inject, observer } from 'mobx-react'
import { computed, observable } from 'mobx'

import Input from '../components/input'
import Button from '../components/button'

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
  isLoading = false

  @observable
  showRegister = false

  @observable
  email = ''

  @observable
  userName = ''

  @observable
  password = ''

  @computed
  get displayText() {
    return this.showRegister ? 'Register' : 'Login'
  }

  handleInputChange = (e, field) => {
    this[field] = e.target.value
  }

  handleLogin = async () => {
    const { email, userName, password } = this
    this.isLoading = true

    await this.props.store.handleLogin({
      email,
      userName,
      password,
    })

    this.isLoading = false
  }

  toggleRegister = () => (this.showRegister = !this.showRegister)

  render() {
    return (
      <div className="wrapper">
        <div className="container">
          <h3>{this.displayText}</h3>
          {inputFields
            .filter(({ onLogin }) => (this.showRegister ? true : onLogin))
            .map(({ label, field, type }) => (
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
          <div>Don't have an account yet?</div>
          <Button unstyled text="Sign Up" onClick={this.toggleRegister} />
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
