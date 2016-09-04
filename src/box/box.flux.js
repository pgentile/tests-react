import _ from 'lodash';
import uuid from 'uuid';

import { BoxList } from './box';


// Actions

export const ADD_TODO_ACTION = Symbol('ADD_TODO_ACTION');
export const MARK_DONE_ACTION = Symbol('MARK_DONE_ACTION');
export const DELETE_TODO_ACTION = Symbol('DELETE_TODO_ACTION');


// Action creator

export function addTodo(content) {
  return {
    type: ADD_TODO_ACTION,
    content,
  };
}

export function markDone(id) {
  return {
    type: MARK_DONE_ACTION,
    id,
  }
}

export function deleteTodo(id) {
  return {
    type: DELETE_TODO_ACTION,
    id,
  }
}

// Reducer

export function todos(state = [], action) {
  switch (action.type) {

    case ADD_TODO_ACTION:
      return [
        ...state,
        {
          id: uuid.v4(),
          content: action.content,
          done: false,
        },
      ];

    case MARK_DONE_ACTION:
      return state.map(todo => {
        if (todo.id !== action.id) {
          return todo;
        }

        const newTodo = _.cloneDeep(todo);
        newTodo.done = true;
        return newTodo;
      });

    case DELETE_TODO_ACTION:
      return state.filter(todo => {
        return todo.id !== action.id;
      });

    default:
      return state;

  }
}
