import queryString from 'query-string';

import { BrowserLocalStorage } from '../browserstorage';


const API_ROOT_URL = 'https://api.spotify.com';
const ACCOUNTS_ROOT_URL = 'https://accounts.spotify.com';
const CLIENT_ID = '847878927a644fc98c98d6313d7f4cdd';


export const spotifyBrowserStorage = new BrowserLocalStorage({
  entryName: 'spotify',
  defaultState: () => {
    return {
      token: null,
    };
  },
});


class SpotifyApi {

  constructor() {
    this.token = spotifyBrowserStorage.read().token;
    this.scopes = [];
    this.redirectUri = null;
    this.authorizing = false;
    this.me = new MeApi(this);
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
            this.authorize();
            throw new Error('Not authorized to use the Spotify API, redirecting to Spotify...');
          default:
            throw new Error(`Got HTTP error ${response.status} calling Spotify API`);
          }
        } else {
          throw new Error(`Failed response: ${response}`);
        }
      }
      return response.json();
    });
  }

  authorize() {
    // Redirect only once
    if (!this.authorizing) {
      this.authorizing = true;
      const joinedScopes = this.scopes.join(' ');
      window.location = `${ACCOUNTS_ROOT_URL}/authorize?response_type=token&client_id=${CLIENT_ID}&scope=${joinedScopes}&redirect_uri=${this.redirectUri}`;
    }
  }

  handleCallback(rawQueryString) {
    return new Promise((resolve, reject) => {
      const params = queryString.parse(rawQueryString);
      const token = params.access_token;
      if (token) {
        this.token = token;
        spotifyBrowserStorage.write({
          token,
        });

        resolve();
      } else {
        reject(new Error(`Got error from Spotify: ${params.error}`));
      }
    });
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


export const api = new SpotifyApi();
api.redirectUri = 'http://localhost:9000/spotify/callback';
api.scopes = ['user-follow-read', 'user-read-private', 'user-top-read'];
