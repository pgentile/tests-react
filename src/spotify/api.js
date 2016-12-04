import uuid from 'uuid';
import queryString from 'query-string';

import { BrowserSessionStorage } from '../browserstorage';


const API_ROOT_URL = 'https://api.spotify.com';
const ACCOUNTS_ROOT_URL = 'https://accounts.spotify.com';
const CLIENT_ID = '847878927a644fc98c98d6313d7f4cdd';


const spotifyBrowserStorage = new BrowserSessionStorage({
  entryName: 'spotify',
  defaultState: () => {
    return {
      token: null,
      authState: null,
    };
  },
});


function unresolvablePromise() {
  return new Promise(() => {});
}


function syncPromise(callback) {
  return new Promise(resolve => {
    return resolve(callback());
  });
}


class SpotifyApi {

  constructor() {
    this.token = spotifyBrowserStorage.read().token;
    this.scopes = ['user-follow-read', 'user-read-private', 'user-top-read'];
    this.redirectUri = `${window.location.protocol}//${window.location.host}/spotify/callback`;
    this.authorizing = false;
    this.me = new MeApi(this);
    this.artists = new ArtistsApi(this);
  }

  get(url) {
    const headers = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const options = { headers };

    return fetch(`${API_ROOT_URL}${url}`, options).then(response => {
      if (!response.ok) {
        if (response.status) {
          switch (response.status) {
          case 401:
            return this.authorize();
          default:
            throw new Error(`Got HTTP error ${response.status} calling Spotify API`);
          }
        }

        throw new Error(`Failed response: ${response}`);
      }
      return response.json();
    });
  }

  authorize() {
    // Redirect only once
    if (!this.authorizing) {
      this.authorizing = true;

      const authState = uuid.v4();
      this.writeInStorage({
        authState,
      });

      const queryParams = queryString.stringify({
        response_type: 'token',
        client_id: CLIENT_ID,
        scope: this.scopes.join(' '),
        redirect_uri: this.redirectUri,
        state: authState,
      });
      window.location = `${ACCOUNTS_ROOT_URL}/authorize?${queryParams}`;
    }

    // Promise that never resolves, because of a inflight authorization
    return unresolvablePromise();
  }

  handleCallback(callbackArgs) {
    return syncPromise(() => {
      const token = callbackArgs.access_token;
      const authState = callbackArgs.state;

      if (!token) {
        throw new Error(`Got error from Spotify auth: ${callbackArgs.error}`);
      }

      const storageAuthState = spotifyBrowserStorage.read().authState;
      if (authState !== storageAuthState) {
        throw new Error('State from callback different from current session state');
      }

      this.writeInStorage({
        token,
      });
      this.token = token;

    });
  }

  writeInStorage(newStorage) {
    const storage = spotifyBrowserStorage.read();
    const mergedStorage = {
      ...storage,
      ...newStorage,
    };
    spotifyBrowserStorage.write(mergedStorage);
  }

}


class MeApi {

  constructor(base) {
    this.base = base;
  }

  getProfile() {
    return this.base.get('/v1/me');
  }

  getFollowedArtists() {
    return this.base.get('/v1/me/following?type=artist&limit=50');
  }

  getTopArtists() {
    return this.base.get('/v1/me/top/artists?limit=50');
  }

}


class ArtistsApi {

  constructor(base) {
    this.base = base;
  }

  getAlbums(artistId) {
    // TODO Market as parameter
    return this.base.get(`/v1/artists/${artistId}/albums?album_type=album&market=FR`);
  }

}


export const api = new SpotifyApi();
