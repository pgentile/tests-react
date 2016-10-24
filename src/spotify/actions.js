import { api } from './api';


export const PREFIX = '@@spotify'
export const LOAD_PROFILE_PROMISE = `${PREFIX}/LOAD_PROFILE`;
export const LOAD_FOLLOWED_ARTISTS_PROMISE = `${PREFIX}/LOAD_FOLLOWED_ARTISTS`;
export const LOAD_TOP_ARTISTS_PROMISE = `${PREFIX}/LOAD_TOP_ARTISTS`;


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
    payload: api.me.getFollowedArtists()
      .then(response => response.artists.items)
      .then(artists => Promise.all(artists.map(mapArtist))),
  };
}


export function loadTopArtists() {
  return {
    type: LOAD_TOP_ARTISTS_PROMISE,
    payload: api.me.getTopArtists()
      .then(response => response.items)
      .then(artists => Promise.all(artists.map(mapArtist))),
  };
}


function mapArtist(artist) {
  let image = null;
  if (artist.images.length > 0) {
    image = artist.images[0].url;
  }

  const mappedArtist = {
    id: artist.id,
    name: artist.name,
    genres: artist.genres,
    followers: artist.followers.total,
    uri: artist.uri,
    popularity: artist.popularity,
    image: image,
  };

  return api.artists.getAlbums(mappedArtist.id)
    .then(albumResponse => {
      mappedArtist.albums = albumResponse.items.map(mapAlbum);
    })
    .then(() => mappedArtist);
}


function mapAlbum(album) {
  return {
    id: album.id,
    name: album.name,
    type: album.type,
    uri: album.uri,
  };
}
