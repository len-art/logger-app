import { action, observable } from 'mobx'

import { tokenHelper, agregate } from '../helpers'

export default class {
  constructor(root) {
    this.root = root
    this.client = root.client
    this.init()
  }

  @observable
  user = undefined

  async init() {
    if (typeof window === 'undefined') return
    const accessToken = sessionStorage.getItem('accessToken')
    if (accessToken && tokenHelper.isValid(accessToken)) {
      this.root.client.defaults.headers.common.Authorization = `Bearer ${accessToken}`
      const success = await this.getUserData()
      if (success !== true && success.message !== 'Network Error') this.resetCookies()
    } else {
      const refreshToken = localStorage.getItem('refreshToken')
      const refreshSecret = localStorage.getItem('refreshSecret')
      if (refreshToken && refreshSecret) {
        await this.getToken({ refreshToken, refreshSecret })
        await this.getUserData()
      }
    }
  }

  async getUserData() {
    try {
      const { data } = await this.client.post('users/data')
      this.onLoginSuccess(data)
      // this.root.projects = data.projects || []
      // this.root.setMonths(data.months || [], true)
      // this.user = data.user || {}
      return true
    } catch (error) {
      console.error(error)
      return error
    }
  }

  async handleLogin({ email, password }) {
    const { data } = await this.client.post('users/login', {
      email,
      password,
    })
    this.onTokenReceived(data)
    this.onLoginSuccess(data)
    this.getUserData()
  }

  @action
  async handleRegister({ email, name, password }) {
    await this.client.post('users/register', {
      email,
      name,
      password,
    })
  }

  @action
  onLoginSuccess({ projects, months, user }) {
    if (user) this.user = user
    this.root.setProjects(projects)
    this.root.setMonths(months)
  }

  async getToken({ refreshToken, refreshSecret }) {
    try {
      const { data } = await this.client.post('users/token', { refreshToken, refreshSecret })
      this.onTokenReceived(data)
    } catch (error) {
      console.error(error)
    }
  }

  @action
  onTokenReceived({ accessToken, refreshToken, refreshSecret }) {
    if (accessToken) {
      sessionStorage.setItem('accessToken', accessToken)
      this.client.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    }
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken)
    }
    if (refreshSecret) {
      localStorage.setItem('refreshSecret', refreshSecret)
    }
  }

  resetCookies() {
    sessionStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('refreshSecret')
    this.user = undefined
  }
}
