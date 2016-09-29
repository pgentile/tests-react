import { connect } from 'react-redux';
import { push } from 'react-router-redux'

import {
  RedditListComponent as RedditListComponentBase,
  LoadTopicComponent as LoadTopicComponentBase,
} from './components';

import * as actions from './actions';


export const RedditListComponent = connect(
  (state) => {
    return {
      list: state.reddit,
    };
  },
  {
    onLoadTopic: actions.loadSubreddit,
    onUnloadTopic: actions.unloadSubreddit,
  },
)(RedditListComponentBase);


export const LoadTopicComponent = connect(
  null,
  (dispatch) => {
    return {
      onLoadTopic: (topic) => dispatch(push(`/reddit/${topic}`)),
    };
  },
)(LoadTopicComponentBase);
