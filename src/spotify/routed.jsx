import { api as spotifyApi } from './api';


export function handleCallback(nextState, replace, callback) {
  spotifyApi.handleCallback(nextState.location.hash)
    .then(() => {
      replace('/spotify');
      callback();
    })
    .catch(error => callback(error));
}
