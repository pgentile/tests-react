import 'babel-polyfill';
import 'jquery';
import 'foundation-sites/js/foundation.core';

import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import promiseMiddleware from 'redux-promise-middleware';

import { todos, visibilityBrowserStorage, todoListBrowserStorage } from './todos/reducers';
import { reddit } from './reddit/reducers';
import { loadingIndicator } from './loadingindicator/reducers';
import { charts } from './charts/reducers';
import { spotify } from './spotify/reducers';
import { errors } from './errors/reducers';

import { TodoComponent } from './todos/containers';
import { BasePageComponent } from './page/components';
import { RedditComponent, RedditListComponent } from './reddit/routed';
import { ChartsComponent } from './charts/containers';
import { SpotifyComponent, FollowedArtists, TopArtists } from './spotify/containers';
import { handleCallback as handleSpotifyCallback } from './spotify/routed';

import { createMiddleware as browserStorageMiddleware } from './browserstorage';


if (process.env.NODE_ENV !== 'production') {
  global.Perf = require('react-addons-perf');
}

// Combined reducers, create store

export const app = combineReducers({
  reddit,
  todos,
  loadingIndicator,
  errors,
  charts,
  spotify,
  routing: routerReducer,
});


let middlewares = [];

if (process.env.NODE_ENV !== 'production') {
  middlewares = middlewares.concat([
    require('redux-logger')(),
    // require('redux-immutable-state-invariant')(),
  ]);
}

middlewares = middlewares.concat([
  routerMiddleware(browserHistory),
  promiseMiddleware(),
  browserStorageMiddleware(visibilityBrowserStorage, state => state.todos.visibility),
  browserStorageMiddleware(todoListBrowserStorage, state => state.todos.list),
]);

const initialState = {
  todos: {
    visibility: visibilityBrowserStorage.read(),
    list: todoListBrowserStorage.read(),
  },
};

export const store = createStore(app, initialState, applyMiddleware(...middlewares));

const history = syncHistoryWithStore(browserHistory, store);


// Render box list

ReactDOM.render(
  (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={BasePageComponent}>
          <IndexRoute component={TodoComponent}/>
          <Route path="reddit" component={RedditComponent}>
            <Route path=":topic" component={RedditListComponent}/>
          </Route>
          <Route path="charts" component={ChartsComponent}/>
          <Route path="spotify" component={SpotifyComponent}>
            <IndexRoute component={FollowedArtists}/>
            <Route path="top" component={TopArtists}/>
          </Route>
          <Route path="spotify/callback" onEnter={handleSpotifyCallback}/>
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('content'),
);
