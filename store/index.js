import { action, observable } from 'mobx'
import axios from 'axios'
import { config } from '../api'
/*
res.json({
  user: {
    name: user.name,
    email,
    createdAt,
    lastLoginAt,
  },
  token,
}) */
export default class {
  constructor() {
    this.client = axios.create(config)
  }

  @observable
  user = undefined

  @observable
  projects = []

  @observable
  selectedProject = 0

  @observable
  selectedMonth = 0

  @action
  async handleLogin({ email, password, withData }) {
    email = 'lenart.velkavrh@gmail.com'
    password = 'foo'
    try {
      const { data } = await this.client.post('users/login', {
        email,
        password,
        withData,
      })
      const {
        user, token, projects, month,
      } = data
      this.user = user
      this.setToken(token)
      if (withData) {
        this.projects = projects
        this.month = month
      }
      return true
    } catch (error) {
      console.error(error)
      return false
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

  setToken(token) {
    if (token) {
      localStorage.setItem('token', token)
      this.client.defaults.headers.common.Authorization = `Bearer ${token}`
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
