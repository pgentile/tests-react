import _ from 'lodash';
import uuid from 'uuid';
import moment from 'moment';
import Immutable from 'immutable';

import * as actions from './actions';
import { BrowserStorage, wrapReducer as wrapBrowserStorageReducer } from '../browserstorage/BrowserStorage';


moment.locale('fr');


// Reducer

export function todos(state = Immutable.List(), action) {
  const now = moment();

  switch (action.type) {

  case actions.ADD_TODO:
    return state.push({
      id: uuid.v4(),
      content: action.content,
      done: false,
      createdAt: now,
      modifiedAt: now,
    });

  case actions.MARK_DONE:
    return state.map(todo => {
      if (todo.id !== action.id) {
        return todo;
      }

      const newTodo = _.cloneDeep(todo);
      newTodo.done = true;
      newTodo.modifiedAt = now;
      return newTodo;
    });

  case actions.DELETE_TODO:
    return state.filter(todo => {
      return todo.id !== action.id;
    });

  default:
    return state;

  }

}


export const visibilityBrowserStorage = new BrowserStorage({
  entryName: 'todoVisibility',
  defaultState: () => {
    return {
      viewDone: true,
    };
  },
});


export const todoVisibility = wrapBrowserStorageReducer(visibilityBrowserStorage, (state, action) => {
  switch (action.type) {

  case actions.CHANGE_VISIBILITY:
    return {
      viewDone: action.viewDone,
    };

  default:
    return state;

  }
});
