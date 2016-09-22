import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'

import {
  RedditListComponent as RedditListComponentBase,
  LoadTopicComponent as LoadTopicComponentBase,
} from './components';

import * as actions from './actions';


export const RedditListComponent = connect(
  (state, ownProps) => {
    return {
      list: state.reddit,
      topic: ownProps.params.topic,
    };
  },
  (dispatch) => {
    return {
      onLoadTopic: (topic) => dispatch(actions.loadSubreddit(topic)),
      onUnloadTopic: () => dispatch(actions.unloadSubreddit()),
    };
  },
)(RedditListComponentBase);


const LoadTopicComponent = connect(
  (state, ownProps) => {
    return {
      topic: ownProps.topic,
    }
  },
  (dispatch) => {
    return {
      onLoadTopic: (topic) => dispatch(push('/reddit/' + topic)),
    };
  },
)(LoadTopicComponentBase);


export function RedditComponent({params, children}) {
  return (
    <div>
      <h1>Reddit</h1>
      <LoadTopicComponent topic={params.topic}/>
      {children}
    </div>
  );
};
