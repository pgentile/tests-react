export const ADD_ERROR = 'ADD_ERROR';
export const DISMISS_ERROR = 'DISMISS_ERROR';

export function addError(message) {
  return {
    type: ADD_ERROR,
    payload: message,
  };
}

export function dismissError() {
  return {
    type: DISMISS_ERROR,
  };
}
