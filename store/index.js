import { action, observable } from 'mobx'
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
  async handleLogin(name, password) {}

  @action
  setSelectedMonth(nextState) {
    this.selectedMonth = nextState
  }

  @action
  setSelectedProject(nextState) {
    this.selectedProject = nextState
  }
}
