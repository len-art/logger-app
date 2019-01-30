import { action, observable } from 'mobx'
import { PromiseBuffer } from '@sentry/core'
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
  @observable
  user = undefined

  @observable
  projects = ['proj1', 'proj2', 'proj3']

  @observable
  selectedProject = 0

  @observable
  selectedMonth = 0

  @action
  async handleLogin(email = '', name, password) {
    /* fake an API async call */
    try {
      const { data } = await new Promise((res, rej) => {
        setTimeout(() => res({ data: { user: { name: 'Fake name' } } }), Math.random() * 500)
      })
      this.user = data.user
    } catch (error) {
      console.error(error)
      return false
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
