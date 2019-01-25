import { action, observable } from 'mobx'

export default class {
  // constructor() {

  // }

  @observable
  projects = ['proj1', 'proj2', 'proj3']

  @observable
  selectedProject = 0

  @observable
  selectedMonth = 0

  @action
  setSelectedMonth(nextState) {
    this.selectedMonth = nextState
  }

  @action
  setSelectedProject(nextState) {
    this.selectedProject = nextState
  }
}
