import uuid from 'uuid';
import moment from 'moment';
import Immutable from 'immutable';

import * as actions from './actions';
import { BrowserLocalStorage, wrapReducerWithStorage } from '../browserstorage';


moment.locale('fr');


// Reducer

export function todos(state = Immutable.List(), action) {
  const now = Object.freeze(moment());

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

      return Object.assign({}, todo, {
        modifiedAt: now,
        done: true,
      });
    });

  case actions.DELETE_TODO:
    return state.filter(todo => {
      return todo.id !== action.id;
    });

  default:
    return state;

  }

}


export const visibilityBrowserStorage = new BrowserLocalStorage({
  entryName: 'todoVisibility',
  defaultState: () => {
    return {
      viewDone: true,
    };
  },
});


export const todoVisibility = wrapReducerWithStorage(visibilityBrowserStorage, (state, action) => {
  switch (action.type) {

  case actions.CHANGE_VISIBILITY:
    return {
      viewDone: action.viewDone,
    };

  default:
    return state;

  }
});
