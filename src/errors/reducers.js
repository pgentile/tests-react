import { LOCATION_CHANGE } from 'react-router-redux';

import * as actions from './actions';


const DEFAULT_STATE = {
  lastError: null,
  errors: [],
};

export function errors(state = DEFAULT_STATE, action) {
  if (action.type && action.type.endsWith('_REJECTED')) {
    return {
      lastError: action.message,
      errors: state.errors.concat([action.message]),
    };
  }

  switch (action.type) {

  case actions.DISMISS_ERROR:
  case LOCATION_CHANGE:
    return DEFAULT_STATE;

  case actions.ADD_ERROR:
    return {
      lastError: action.payload,
      errors: state.errors.concat([action.payload]),
    };

  default:
    return state;

  }
}
