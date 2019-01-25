import { action, observable } from 'mobx'
import { format } from 'date-fns'

export default class {
  // constructor() {

  // }

  @observable
  selectedMonth = 0

  @action
  setSelectedMonth(nextState) {
    this.selectedMonth = nextState
  }
}
