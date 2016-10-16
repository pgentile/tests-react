import { connect } from 'react-redux';

import * as actions from './actions';
import { SpotifyComponent as SpotifyComponentBase, Artists } from './components';

export const SpotifyComponent = connect(
  state => {
    return {
      profile: state.spotify.profile,
    };
  },
  {
    onLoadProfile: actions.loadProfile,
  },
)(SpotifyComponentBase);


export const FollowedArtists = connect(
  state => {
    return {
      artists: state.spotify.followedArtists,
    };
  },
  {
    onLoadArtists: actions.loadFollowedArtists,
  },
)(Artists);


export const TopArtists = connect(
  state => {
    return {
      artists: state.spotify.topArtists,
    };
  },
  {
    onLoadArtists: actions.loadTopArtists,
  },
)(Artists);
