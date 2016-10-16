import { api } from './api';


export const LOAD_PROFILE_PROMISE = 'SPOTIFY_LOAD_PROFILE';
export const LOAD_FOLLOWED_ARTISTS_PROMISE = 'LOAD_FOLLOWED_ARTISTS';
export const LOAD_TOP_ARTISTS_PROMISE = 'LOAD_TOP_ARTISTS_PROMISE';


export function loadProfile() {
  return {
    type: LOAD_PROFILE_PROMISE,
    payload: api.me.getProfile().then(response => {
      return {
        id: response.id,
        uri: response.uri,
        country: response.country,
      };
    }),
  };
}


export function loadFollowedArtists() {
  return {
    type: LOAD_FOLLOWED_ARTISTS_PROMISE,
    payload: api.me.getFollowedArtists().then(response => {
      return response.artists.items.map(mapArtist);
    }),
  };
}


export function loadTopArtists() {
  return {
    type: LOAD_TOP_ARTISTS_PROMISE,
    payload: api.me.getTopArtists().then(response => {
      return response.items.map(mapArtist);
    }),
  };
}


function mapArtist(artist) {
  let image = null;
  if (artist.images.length > 0) {
    image = artist.images[0].url;
  }

  return {
    id: artist.id,
    name: artist.name,
    genres: artist.genres,
    followers: artist.followers.total,
    uri: artist.uri,
    popularity: artist.popularity,
    image: image,
  };
}
