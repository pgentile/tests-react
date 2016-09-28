import { LOCATION_CHANGE } from 'react-router-redux';

import * as actions from './actions';


const DEFAULT_STATE = {
  lastError: null,
};

export function errors(state = DEFAULT_STATE, action) {
  if (action.type) {
    if (action.type === actions.DISMISS_ERROR || action.type === LOCATION_CHANGE) {
      return {
        lastError: null,
      };
    }
    if (action.type.endsWith('_REJECTED')) {
      return {
        lastError: action.payload.message,
      };
    }
    if (action.type === actions.ADD_ERROR) {
      return {
        lastError: action.payload,
      };
    }
  }
  return state;
}
