import React from 'react';
import { connect } from 'react-redux';

import {
  RedditListComponent as RedditListComponentBase,
  LoadTopicComponent as LoadTopicComponentBase,
} from './components';
import { PageWithNavbarComponent } from '../navbar/components';

import * as actions from './actions';


const RedditListComponent = connect(
  (state) => {
    return {
      list: state.reddit,
    };
  },
)(RedditListComponentBase);


const LoadTopicComponent = connect(
  (state) => {
    return {
      topic: state.redditTopic,
    }
  },
  (dispatch) => {
    return {
      onLoadTopic: (topic) => dispatch(actions.loadSubreddit(topic)),
      onChangeTopic: (topic) => dispatch(actions.changeTopic(topic)),
    };
  },
)(LoadTopicComponentBase);


export function RedditComponent() {
  return (
    <PageWithNavbarComponent>
      <h1>Reddit</h1>
      <LoadTopicComponent/>
      <RedditListComponent/>
    </PageWithNavbarComponent>
  );
};
