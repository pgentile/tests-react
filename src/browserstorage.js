import shallowEqual from 'shallowequal';
import invariant from 'invariant';


class BrowserStorage {

  constructor(storage, config) {
    invariant(config.entryName, 'entryName is undefined');

    this.storage = storage;

    this.config = {
      defaultState: () => {
        return {};
      },
      beforeSerialize: value => value,
      afterDeserialize: value => value,
      serializer: JSON.stringify,
      deserializer: JSON.parse,
      ...config,
    };
  }

  read() {
    const { defaultState, deserializer, afterDeserialize } = this.config;

    const storedValue = this.readInStorage();
    if (storedValue === null) {
      return defaultState();
    }

    try {
      return afterDeserialize(deserializer(storedValue));
    } catch (e) {
      // Ignoring exception, use default value
      this.clearInStorage();
      return defaultState();
    }
  }

  write(value) {
    const { serializer, beforeSerialize } = this.config;
    this.writeInStorage(serializer(beforeSerialize(value)));
  }

  reset() {
    this.clearInStorage();
  }

  readInStorage() {
    const { entryName } = this.config;
    return this.storage.getItem(entryName);
  }

  writeInStorage(value) {
    const { entryName } = this.config;
    this.storage.setItem(entryName, value);
  }

  clearInStorage() {
    const { entryName } = this.config;
    this.storage.removeItem(entryName);
  }

}


export class BrowserLocalStorage extends BrowserStorage {

  constructor(config) {
    super(window.localStorage, config);
  }

}


export class BrowserSessionStorage extends BrowserStorage {

  constructor(config) {
    super(window.sessionStorage, config);
  }

}


export function createMiddleware(browserStorage, stateSelector, compare = shallowEqual) {
  return store => next => action => {
    const beforeState = stateSelector(store.getState());
    const output = next(action);
    const afterState = stateSelector(store.getState());
    if (!compare(beforeState, afterState)) {
      browserStorage.write(afterState);
    }
    return output;
  };
}
