import moment from 'moment';
import Immutable from 'immutable';
import { combineReducers } from 'redux';

import * as actions from './actions';
import { BrowserLocalStorage } from '../browserstorage';


// Reducer


export const todoListBrowserStorage = new BrowserLocalStorage({
  entryName: 'todoList',
  defaultState: () => Immutable.List(),
  beforeSerialize: list => {
    return list.map(item => {
      return {
        ...item,
        createdAt: item.createdAt.format(),
        modifiedAt: item.modifiedAt.format(),
      };
    }).toArray();
  },
  afterDeserialize: list => {
    return Immutable.List(list).map(item => {
      return {
        ...item,
        createdAt: Object.freeze(moment(item.createdAt)),
        modifiedAt: Object.freeze(moment(item.modifiedAt)),
      };
    });
  },
})


function list(state = Immutable.List(), action) {
  switch (action.type) {

  case actions.ADD_TODO:
    return state.push({
      id: action.id,
      content: action.content,
      done: false,
      createdAt: action.date,
      modifiedAt: action.date,
    });

  case actions.MARK_DONE:
    return state.map(todo => {
      if (todo.id !== action.id) {
        return todo;
      }

      return {
        ...todo,
        modifiedAt: action.date,
        done: true,
      };
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


function visibility(state = { viewDone: true }, action) {
  switch (action.type) {

  case actions.CHANGE_VISIBILITY:
    return {
      viewDone: action.viewDone,
    };

  default:
    return state;

  }
}


export const todos = combineReducers({
  list,
  visibility,
});
