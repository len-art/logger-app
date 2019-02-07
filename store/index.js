import { action, observable } from 'mobx'
import axios from 'axios'
import { init } from '@sentry/browser'
import { startOfMonth } from 'date-fns'
import { config } from '../api'
import { tokenHelper, agregate } from '../helpers'

export default class {
  constructor() {
    this.client = axios.create(config)
    this.init()
  }

  @observable
  user = undefined

  @observable
  projects = []

  @observable
  months = [
    {
      id: 'fakeId414',
      projectId: 'proj1',
      startsAt: startOfMonth(new Date('2018-12-12T12:47:08.439Z')),
      createdAt: new Date('2018-12-12T12:47:08.439Z'),
      monthId: 11,
    },
    {
      id: 'fakeId424d',
      projectId: 'proj1',
      startsAt: startOfMonth(new Date('2018-11-02T19:47:08.439Z')),
      createdAt: new Date('2018-11-02T19:47:08.439Z'),
      monthId: 10,
    },
    {
      id: 'fakeIdbdx',
      projectId: 'proj1',
      startsAt: startOfMonth(new Date('2018-10-28T19:47:08.439Z')),
      createdAt: new Date('2018-10-28T19:47:08.439Z'),
      monthId: 9,
    },
  ]

  @observable
  selectedProject = 0

  @observable
  selectedMonth = undefined

  async init() {
    if (typeof window === 'undefined') return
    const accessToken = sessionStorage.getItem('accessToken')
    if (accessToken && tokenHelper.isValid(accessToken)) {
      this.client.defaults.headers.common.Authorization = `Bearer ${accessToken}`
      const success = await this.getUserData()
      if (!success) this.resetCookies()
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
      this.projects = data.projects || []
      this.months = data.months && data.months.map(m => agregate.toMonth(m))
      if (this.months.length) {
        this.selectedMonth = this.months[0].id
      }
      this.user = data.user || {}
      return true
    } catch (error) {
      console.error(error)
      return false
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
    const { data } = await this.client.post('users/login', {
      email,
      password,
    })
    this.handleLoginSuccess(data)
    this.getUserData()
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

  resetCookies() {
    sessionStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('refreshSecret')
    this.user = undefined
  }

  @action
  async handleRegister({ email, name, password }) {
    await this.client.post('users/register', {
      email,
      name,
      password,
    })
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
