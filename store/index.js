import { action, observable } from 'mobx';

export default class {
  // constructor() {

  // }

  @observable
  test = 'foo';

  @action
  handleTestChange() {
    this.test = 'bar';
  }
}
