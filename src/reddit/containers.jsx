import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import { Row, Column } from 'react-foundation';

import {
  RedditListComponent as RedditListComponentBase,
  LoadTopicComponent as LoadTopicComponentBase,
} from './components';

import { PageComponent } from '../page/components';

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
      onLoadTopic: (topic) => dispatch(push(`/reddit/${topic}`)),
    };
  },
)(LoadTopicComponentBase);


export function RedditComponent({params, children}) {
  return (
    <PageComponent title="Reddit">
      <LoadTopicComponent topic={params.topic}/>
      {children}
    </PageComponent>
  );
};
