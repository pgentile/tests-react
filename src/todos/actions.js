// Actions

export const ADD_TODO = 'ADD_TODO';
export const MARK_DONE = 'MARK_DONE';
export const DELETE_TODO = 'DELETE_TODO';
export const CHANGE_VISIBILITY = 'CHANGE_VISIBILITY';


// Action creator

export function addTodo(content) {
  return {
    type: ADD_TODO,
    content,
  };
}

export function markDone(id) {
  return {
    type: MARK_DONE,
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
