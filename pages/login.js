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
  showLogin = false

  @observable
  error

  toggleRegister = () => (this.showLogin = !this.showLogin)

  handleLogin = async ({ email, password }) => {
    try {
      this.error = undefined
      this.isLoading = true
      await this.props.store.auth.handleLogin({ email, password, withData: true })
      this.props.router.push('/')
    } catch (error) {
      console.error(error)
      if (error.message) {
        this.error = error.message
      }
    } finally {
      this.isLoading = false
    }
  }

  handleRegister = async ({ email, name, password }) => {
    try {
      this.error = undefined
      this.isLoading = true
      await this.props.store.auth.handleRegister({ email, name, password })
      await this.handleLogin({ email, password })
    } catch (error) {
      console.error(error)
      if (error.message) {
        this.error = error.message
      }
    } finally {
      this.isLoading = false
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className={this.showLogin ? 'container register' : 'container'}>
          {/* todo: animate (div flip) when switching */}
          {this.showLogin ? (
            <Register
              handleRegister={this.handleRegister}
              toggleRegister={this.toggleRegister}
              isLoading={this.isLoading}
              error={this.error}
            />
          ) : (
            <Login
              handleLogin={this.handleLogin}
              toggleRegister={this.toggleRegister}
              isLoading={this.isLoading}
              error={this.error}
            />
          )}
          <div className="small">Don't have an account yet?</div>
          <Button
            unstyled
            text={this.showLogin ? 'Log in' : 'Register'}
            onClick={this.toggleRegister}
          />
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
