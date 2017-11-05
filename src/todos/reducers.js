import moment from 'moment';
import { combineReducers } from 'redux';

import * as actions from './actions';
import { BrowserLocalStorage } from '../browserstorage';


// Reducer


export const todoListBrowserStorage = new BrowserLocalStorage({
  entryName: 'todoList',
  defaultState: () => [],
  beforeSerialize: list => {
    return list.map(item => {
      return {
        ...item,
        createdAt: item.createdAt.format(),
        modifiedAt: item.modifiedAt.format(),
      };
    });
  },
  afterDeserialize: list => {
    return list.map(item => {
      return {
        ...item,
        createdAt: moment(item.createdAt),
        modifiedAt: moment(item.modifiedAt),
      };
    });
  },
})


function list(state = [], action) {
  switch (action.type) {

  case actions.ADD_TODO:
  {
    const newTodo = {
      id: action.id,
      content: action.content,
      done: false,
      createdAt: action.date,
      modifiedAt: action.date,
    };

    return [...state, newTodo];
  }

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

  case actions.MARK_TODO:
    return state.map(todo => {
      if (todo.id !== action.id) {
        return todo;
      }

      return {
        ...todo,
        modifiedAt: action.date,
        done: false,
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
