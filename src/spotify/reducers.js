import { combineReducers } from 'redux';

import * as actions from './actions';

export function profile(state = null, action) {
  switch (action.type) {

  case `${actions.LOAD_PROFILE_PROMISE}_FULFILLED`:
    return action.payload;

  case actions.LOAD_PROFILE_PROMISE:
  case `${actions.LOAD_PROFILE_PROMISE}_REJECTED`:
    return null;

  default:
    return state;
  }
}


export function followedArtists(state = [], action) {
  switch (action.type) {

  case `${actions.LOAD_FOLLOWED_ARTISTS_PROMISE}_FULFILLED`:
    return action.payload;

  case actions.LOAD_FOLLOWED_ARTISTS_PROMISE:
  case `${actions.LOAD_FOLLOWED_ARTISTS_PROMISE}_REJECTED`:
    return [];

  default:
    return state;
  }
}



export function topArtists(state = [], action) {
  switch (action.type) {

  case `${actions.LOAD_TOP_ARTISTS_PROMISE}_FULFILLED`:
    return action.payload;

  case actions.LOAD_TOP_ARTISTS_PROMISE:
  case `${actions.LOAD_TOP_ARTISTS_PROMISE}_REJECTED`:
    return [];

  default:
    return state;
  }
}


export const spotify = combineReducers({
  profile,
  followedArtists,
  topArtists,
});
