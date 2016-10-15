import invariant from 'invariant';

/*
class BrowserStorageItem {

  constructor({ type, entryName }) {
    this.storage = window[type];
    this.entryName = entryName;
  }

  read() {
    return this.storage.getItem(this.entryName);
  }

  write(value) {
    this.storage.setItem(this.entryName, value);
  }

  reset() {
    this.storage.removeItem(this.entryName);
  }

}
*/


export class BrowserStorage {

  constructor(config) {
    invariant(config.entryName, 'entryName is undefined');

    this.config = Object.assign({
      type: 'localStorage',
      defaultState: () => {
        return {};
      },
      serializer: JSON.stringify,
      deserializer: JSON.parse,
    }, config);
  }

  read() {
    const { defaultState, deserializer } = this.config;

    const storedValue = this.readInStorage();
    if (storedValue === null) {
      return defaultState();
    }

    try {
      return deserializer(storedValue);
    } catch (e) {
      // Ignoring exception, use default value
      this.clearInStorage();
      return defaultState();
    }
  }

  write(value) {
    const { serializer } = this.config;
    this.writeInStorage(serializer(value));
  }

  reset() {
    this.clearInStorage();
  }

  readInStorage() {
    const { type, entryName } = this.config;
    return window[type].getItem(entryName);
  }

  writeInStorage(value) {
    const { type, entryName } = this.config;
    window[type].setItem(entryName, value);
  }

  clearInStorage() {
    const { type, entryName } = this.config;
    window[type].removeItem(entryName);
  }

}


export function wrapReducer(browserStorage, reducer) {
  const defaultState = browserStorage.read();
  return (state = defaultState, action) => {
    return reducer(state, action);
  };
}


export function createMiddleware(browserStorage, stateSelector) {
  return store => next => action => {
    const beforeState = stateSelector(store.getState());
    const output = next(action);
    const afterState = stateSelector(store.getState());
    if (beforeState !== afterState) {
      browserStorage.write(afterState);
    }
    return output;
  };
}
