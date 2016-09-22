// Actions

export const ADD_TODO = 'ADD_TODO';
export const MARK_DONE = 'MARK_DONE';
export const DELETE_TODO = 'DELETE_TODO';
export const CHANGE_VISIBILITY = 'CHANGE_VISIBILITY';
export const FOO_PROMISE = 'FOO';


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

export function foo() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        message: 'This is done',
      });
    }, 500);
  });

  return {
    type: FOO_PROMISE,
    payload: promise,
  };
};
