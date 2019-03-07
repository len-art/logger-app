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

  @observable
  projects = []

  @observable
  months = []

  @observable
  selectedProject = undefined

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
      this.selectedProject = projectId
      this.setMonths(data.months, true)
      if (this.months.length) {
        this.setSelectedMonth(this.months[this.months.length - 1].id)
      }
    } catch (error) {
      console.error(error)
    }
  }

  @action
  setProjects(projects) {
    if (Array.isArray(projects)) {
      this.projects = projects
    } else this.projects = []

    if (this.projects.length) {
      this.selectedProject = this.projects[this.projects.length - 1].id
    }
  }

  @action
  setMonths(months) {
    if (Array.isArray(months)) {
      this.months = months.map(m => agregate.toMonth(m))
    } else this.months = []
    if (this.months.length) {
      this.setSelectedMonth(this.months[this.months.length - 1].id)
    }
  }

  async editEvent(monthId, eventId, event) {
    const { data } = await this.client.post(`/months/${monthId}/edit/${eventId}`, { event })

    this.updateMonths(agregate.toMonth(data.month))
  }

  async addEvent(monthId, event) {
    const { data } = await this.client.post(`/months/${monthId}/add`, { event })
    this.updateMonths(agregate.toMonth(data.month))
  }

  @action
  updateMonths(month) {
    const index = this.months.findIndex(({ id }) => id === month.id)
    if (index !== -1) this.months[index] = month
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
