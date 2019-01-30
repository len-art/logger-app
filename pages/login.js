import React from 'react'
import { inject, observer } from 'mobx-react'
import { computed, observable } from 'mobx'

import Input from '../components/input'
import Button from '../components/button'

import Login from '../components/auth/login'
import Register from '../components/auth/register'

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

  toggleRegister = () => (this.showRegister = !this.showRegister)

  render() {
    return (
      <div className="wrapper">
        <div className={this.showRegister ? 'container register' : 'container'}>
          {/* todo: animate (div flip) when switching */}
          {this.showRegister ? (
            <Register toggleRegister={this.toggleRegister} isLoading={this.isLoading} />
          ) : (
            <Login toggleRegister={this.toggleRegister} isLoading={this.isLoading} />
          )}
          <div className="small">Don't have an account yet?</div>
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
