// Reducer

import * as actions from './actions';


export function reddit(state = [], action) {
  switch (action.type) {

    case actions.SUBREDDIT_PROMISE + '_FULFILLED':
      return action.payload;

    case actions.SUBREDDIT_PROMISE + '_REJECTED':
      return [];

    default:
      return state;

  }
}


export function redditTopic(state = 'java', action) {
  switch (action.type) {

    case actions.CHANGE_TOPIC:
      return action.topic;

    default:
      return state;

  }
}
