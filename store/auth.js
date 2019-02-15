import { action, observable, computed } from 'mobx'

import { tokenHelper } from '../helpers'

export default class {
  constructor(root) {
    this.root = root
    this.client = root.client
    this.init()
  }

  @observable
  afterAuth = false

  @observable
  user = undefined

  async init() {
    if (typeof window === 'undefined') return
    // const accessToken = sessionStorage.getItem('accessToken')
    const { accessToken, refreshSecret, refreshToken } = this.localStorageData()
    if (accessToken && tokenHelper.isValid(accessToken)) {
      this.root.client.defaults.headers.common.Authorization = `Bearer ${accessToken}`
      const data = await this.getUserData()
      if (!data.success && data.message !== 'Network Error') {
        this.resetCookies()
      }
    } else if (refreshToken && refreshSecret) {
      // const refreshToken = localStorage.getItem('refreshToken')
      // const refreshSecret = localStorage.getItem('refreshSecret')
      // if (refreshToken && refreshSecret) {
      await this.getToken({ refreshToken, refreshSecret })
      await this.getUserData()
      // }
    }
    this.afterAuth = true
  }

  localStorageData = () => {
    const accessToken = sessionStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')
    const refreshSecret = localStorage.getItem('refreshSecret')
    return { accessToken, refreshSecret, refreshToken }
  }

  async getUserData() {
    try {
      const { data } = await this.client.post('users/data')
      this.onLoginSuccess(data)
      return { success: true }
    } catch (error) {
      console.error(error)
      return { success: false, message: error.message }
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
  async onLoginSuccess({ projects, months, user }) {
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

  @action
  resetCookies = () => {
    sessionStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('refreshSecret')
    this.user = undefined
    this.root.resetLocalData()
  }

  @computed
  get isLoggedIn() {
    console.log(this.user)
    if (!this.afterAuth) return undefined
    return this.user !== undefined
  }
}
