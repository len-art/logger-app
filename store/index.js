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
  months = [
    {
      id: 'fakeId414',
      projectId: 'proj1',
      createdAt: new Date('2018-12-12T12:47:08.439Z'),
      monthId: 11,
    },
    {
      id: 'fakeId424d',
      projectId: 'proj1',
      createdAt: new Date('2018-11-02T19:47:08.439Z'),
      monthId: 10,
    },
    {
      id: 'fakeIdbdx',
      projectId: 'proj1',
      createdAt: new Date('2018-10-28T19:47:08.439Z'),
      monthId: 9,
    },
  ]

  @observable
  selectedProject = 0

  @observable
  selectedMonth = 0

  @action
  async handleLogin({ email = '', name, password }) {
    /* fake an API async call */
    try {
      const { data } = await new Promise((res, rej) => {
        setTimeout(() => res({ data: { user: { name: 'Fake name' } } }), Math.random() * 500)
      })
      this.user = data.user
      return true
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
