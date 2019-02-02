import { action, observable } from 'mobx'
import axios from 'axios'
import { init } from '@sentry/browser'
import { config } from '../api'
import { tokenHelper } from '../helpers'

export default class {
  constructor() {
    this.client = axios.create(config)
    this.init()
  }

  @observable
  user = undefined

  @observable
  projects = [{ name: 'placeholder1' }]

  @observable
  selectedProject = 0

  @observable
  selectedMonth = 0

  async init() {
    if (typeof window === 'undefined') return
    const accessToken = sessionStorage.getItem('accessToken')
    if (accessToken && tokenHelper.isValid(accessToken)) {
      this.client.defaults.headers.common.Authorization = `Bearer ${accessToken}`
      this.getUserData()
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
      this.projects = data.projects
      this.month = data.month
      this.user = data.user
    } catch (error) {
      console.error(error)
    }
  }

  async getToken({ refreshToken, refreshSecret }) {
    try {
      const { data } = await this.client.post('users/token', { refreshToken, refreshSecret })
      this.handleLoginSuccess(data)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  async handleLogin({ email, password }) {
    email = 'lenart.velkavrh@gmail.com'
    password = 'foo'
    try {
      const { data } = await this.client.post('users/login', {
        email,
        password,
      })
      this.handleLoginSuccess(data)
      this.getUserData()
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  @action
  handleLoginSuccess({
    user, accessToken, refreshToken, refreshSecret,
  }) {
    if (user) {
      this.user = user
    }
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
  async handleRegister({ email, name, password }) {
    /* fake an API async call */
    try {
      await this.client.post('users/register', {
        email,
        name,
        password,
      })
      this.user = data.user
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  async addProject({ name }) {
    try {
      const { data } = await this.client.post('projects/create', {
        name,
      })
      this.projects.unshift(data.project)
    } catch (error) {
      console.error(error)
    }
  }

  @action
  setSelectedMonth(nextState) {
    this.selectedMonth = nextState
  }

  @action
  setSelectedProject(nextState) {
    this.selectedProject = nextState
  }
}
