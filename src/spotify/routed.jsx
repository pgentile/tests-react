import queryString from 'query-string';

import { api as spotifyApi } from './api';


export function handleCallback(nextState, replace, callback) {
  const callbackArgs = Object.assign({},
    queryString.parse(nextState.location.hash),
    nextState.location.query,
  );

  spotifyApi.handleCallback(callbackArgs)
    .then(() => {
      replace('/spotify');
      callback();
    })
    .catch(error => callback(error));
}
