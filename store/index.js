import { action, observable } from 'mobx'
import axios from 'axios'
import { init } from '@sentry/browser'
import { startOfMonth } from 'date-fns'

import Auth from './auth'
import { config } from '../api'
import { agregate } from '../helpers'

export default class {
  constructor() {
    this.client = axios.create(config)
    this.auth = new Auth(this)
  }

  // @observable
  // user = undefined

  @observable
  projects = []

  @observable
  months = []

  @observable
  selectedProject = 0

  @observable
  selectedMonth = undefined

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

  async getProject({ projectId }) {
    try {
      const { data } = await this.client.post('projects/get', {
        projectId,
      })
      this.project = projectId
      this.setMonths(data.months, true)
      // this.months = data.months && data.months.map(m => agregate.toMonth(m))
      if (this.months.length) {
        this.selectedMonth = this.months[0].id
      }
    } catch (error) {
      console.error(error)
    }
  }

  async createMonth({ projectId, dayInMonth }) {
    try {
      const { data } = await this.client.post('months/create', {
        projectId,
        dayInMonth,
      })
      this.months.push(agregate.toMonth(data.month))
    } catch (error) {
      console.log(error)
    }
  }

  @action
  setProjects(projects) {
    if (!Array.isArray(projects)) {
      this.projects = []
      return
    }
    this.projects = projects
    if (this.projects.length) {
      this.selectedProject = this.projects[0].id
    }
  }

  @action
  setMonths(months) {
    if (!Array.isArray(months)) {
      this.months = []
      return
    }
    this.months = months.map(m => agregate.toMonth(m))
    if (this.months.length) {
      this.selectedMonth = this.months[0].id
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

  @action
  resetLocalData = () => {
    this.projects = []
    this.months = []
    this.selectedProject = 0
    this.selectedMonth = undefined
  }
}
