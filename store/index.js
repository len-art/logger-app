import { action, observable } from 'mobx'
import axios from 'axios'
import { init } from '@sentry/browser'
import { startOfMonth, getDaysInMonth } from 'date-fns'

import Auth from './auth'
import { config, Client } from '../api'
import { agregate } from '../helpers'

export default class {
  constructor() {
    // this.client = axios.create(config)
    this.client = new Client({
      prefix: config.urlPrefix,
    })
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

  @observable
  isNewProjectModalOpen = false

  async addProject({ name }) {
    try {
      const data = await this.client.post('projects/create', {
        name,
      })
      this.addNewProject(data.project)
      this.setMonths([data.month])
    } catch (error) {
      console.error(error)
    }
  }

  async getProject({ projectId }) {
    try {
      const data = await this.client.post('projects/get', {
        projectId,
      })
      this.selectedProject = projectId
      this.setMonths(data.months)
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
      this.projects = projects.map(p => agregate.toProject(p))
    } else {
      this.projects = []
      this.setIsNewProjectModalOpen()
    }

    if (this.projects.length) {
      this.selectedProject = this.projects[0].id
    }
  }

  @action
  addNewProject(project) {
    const index = this.projects.findIndex(({ id }) => id === project.id)
    if (index === -1) {
      this.projects.unshift(agregate.toProject(project))
    } else {
      this.projects[index] = project
    }
    this.selectedProject = project.id
  }

  @action
  setMonths(months) {
    if (Array.isArray(months)) {
      this.months = months.map(m => agregate.toMonth(m))
    } else {
      this.months = []
    }
    if (this.months.length) {
      this.setSelectedMonth(this.months[0].id)
    }
  }

  async createMonth(projectId, dayInMonth) {
    const { data } = await this.client.post('/months/create', { projectId, dayInMonth })
    this.updateMonths(agregate.toMonth(data.month))
  }

  @action
  addNewMonth(month) {
    this.months.unshift(agregate.toMonth(month))
    this.selectedMonth = month.id
  }

  async editEvent(monthId, eventId, event) {
    const data = await this.client.post(`months/${monthId}/edit/${eventId}`, { event })

    this.updateMonths(agregate.toMonth(data.month))
  }

  async addEvent(monthId, event) {
    const data = await this.client.post(`months/${monthId}/add`, { event })
    this.updateMonths(agregate.toMonth(data.month))
  }

  @action
  updateMonths(month) {
    const index = this.months.findIndex(({ id }) => id === month.id)
    if (index !== -1) {
      this.months[index] = month
    } else {
      this.months.push(month)
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

  @action
  setIsNewProjectModalOpen = (isOpen = !this.isNewProjectModalOpen) => {
    this.isNewProjectModalOpen = isOpen
  }
}
