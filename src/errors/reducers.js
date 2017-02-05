import { LOCATION_CHANGE } from 'react-router-redux';
import _ from 'lodash';

import * as actions from './actions';


const DEFAULT_STATE = {
  errors: [],
};

export function errors(state = DEFAULT_STATE, action) {
  if (action.type === actions.DISMISS_ERROR || action.type === LOCATION_CHANGE) {
    return DEFAULT_STATE;
  }

  if (!action.error) {
    return state;
  }

  const errorMessage = _.toString(action.payload);
  return {
    errors: state.errors.concat([errorMessage]),
  };
}
