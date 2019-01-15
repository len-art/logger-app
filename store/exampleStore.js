import { types } from 'mobx-state-tree';

export const ExampleStore = types
  .model('ExampleStore', {
    test: 'Sample mobx store test works.',
  })
  .actions(self => ({
    afterCreate() {
      console.log('ExampleStore created!', self);
    },
    setTest() {
      console.log('Bla');
      self.test = 'Novo neki';
    },
  }));
