import { types, applySnapshot } from 'mobx-state-tree';
import { ExampleStore } from './exampleStore';

let store = null;

// actual store where you put your store models
const Store = types.model('Store', {
  example: types.optional(ExampleStore, {}),
}).actions(self => ({
  afterCreate() {
    console.log('Store created!', JSON.stringify(self));
  },
}));

export const initStore = (isServer, snapshot = null) => {
  if (isServer) {
    store = Store.create({ lastUpdate: Date.now() });
  }
  if (store === null) {
    store = Store.create({ lastUpdate: Date.now() });
  }
  if (snapshot) {
    applySnapshot(store, snapshot);
  }
  return store;
};
