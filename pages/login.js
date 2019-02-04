import React from 'react'
import { withRouter } from 'next/router'
import { inject, observer } from 'mobx-react'
import { computed, observable } from 'mobx'

import Button from '../components/button'

import Login from '../components/auth/login'
import Register from '../components/auth/register'

@withRouter
@inject('store')
@observer
export default class extends React.Component {
  @observable
  isLoading = false

  @observable
  showRegister = false

  toggleRegister = () => (this.showRegister = !this.showRegister)

  handleLogin = async ({ email, password }) => {
    try {
      this.isLoading = true
      const isLoggedIn = await this.props.store.handleLogin({ email, password, withData: true })
      if (isLoggedIn) this.props.router.push('/')
    } catch (error) {
      console.error(error)
    } finally {
      this.isLoading = false
    }
  }

  handleRegister = ({ email, name, password }) => {
    try {
      this.isLoading = true
      this.props.store.handleRegister({ email, name, password })
    } catch (error) {
      console.error(error)
    } finally {
      this.isLoading = false
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className={this.showRegister ? 'container register' : 'container'}>
          {/* todo: animate (div flip) when switching */}
          {this.showRegister ? (
            <Register
              handleRegister={this.handleRegister}
              toggleRegister={this.toggleRegister}
              isLoading={this.isLoading}
            />
          ) : (
            <Login
              handleLogin={this.handleLogin}
              toggleRegister={this.toggleRegister}
              isLoading={this.isLoading}
            />
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
