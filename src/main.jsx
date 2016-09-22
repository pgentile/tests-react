import 'jquery';

import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import promiseMiddleware from 'redux-promise-middleware';
import createLogger from 'redux-logger';

import { todos, todoVisibility } from './todos/reducers';
import { TodoComponent } from './todos/containers';

import { reddit, redditTopic } from './reddit/reducers';
import { RedditComponent } from './reddit/containers';

import 'foundation-sites/js/foundation.core';
import 'foundation-sites/dist/foundation.css';


// Combined reducers, create store

export const app = combineReducers({
  reddit,
  redditTopic,
  todos,
  todoVisibility,
  routing: routerReducer,
});

export const store = createStore(app, applyMiddleware(
  promiseMiddleware(),
  createLogger(),
));

const history = syncHistoryWithStore(browserHistory, store);


// Render box list

ReactDOM.render(
  (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={TodoComponent} />
        <Route path="/reddit" component={RedditComponent} />
      </Router>
    </Provider>
  ),
  document.getElementById('content'),
);
