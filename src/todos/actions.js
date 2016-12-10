import uuid from 'uuid';
import moment from 'moment';

// Actions

export const ADD_TODO = 'ADD_TODO';
export const MARK_DONE = 'MARK_DONE';
export const MARK_TODO = 'MARK_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const CHANGE_VISIBILITY = 'CHANGE_VISIBILITY';


// Action creator

export function addTodo(content) {
  return {
    type: ADD_TODO,
    id: uuid.v4(),
    date: Object.freeze(moment()),
    content,
  };
}

export function markDone(id) {
  return {
    type: MARK_DONE,
    date: Object.freeze(moment()),
    id,
  }
}

export function markTodo(id) {
  return {
    type: MARK_TODO,
    date: Object.freeze(moment()),
    id,
  }
}

export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    id,
  }
}

export function changeDoneVisibility(viewDone) {
  return {
    type: CHANGE_VISIBILITY,
    viewDone,
  };
}
