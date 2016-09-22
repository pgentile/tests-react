// Reducer

import * as actions from './actions';


export function reddit(state = [], action) {
  switch (action.type) {

    case actions.SUBREDDIT_PROMISE + '_FULFILLED':
      return action.payload;

    case actions.SUBREDDIT_PROMISE + '_REJECTED':
      return [];

    case actions.UNLOAD_SUBREDDIT:
      return [];

    default:
      return state;

  }
}
