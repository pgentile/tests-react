import 'babel-polyfill';
import 'jquery';
import 'foundation-sites/js/foundation.core';

import moment from 'moment';

import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Perf from 'react-addons-perf';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import { todos, visibilityBrowserStorage, todoListBrowserStorage } from './todos/reducers';
import { reddit } from './reddit/reducers';
import { loadingIndicator } from './loadingindicator/reducers';
import { charts } from './charts/reducers';
import { spotify } from './spotify/reducers';
import { errors } from './errors/reducers';
import { springBoot } from './spring-boot/reducers';

import { TodoComponent } from './todos/containers';
import { BasePageComponent } from './page/components';
import { RedditComponent, RedditListComponent } from './reddit/routed';
import { ChartsComponent } from './charts/containers';
import { SpotifyComponent, FollowedArtists, TopArtists } from './spotify/containers';
import { PaginationComponent } from './pagination/containers';
import { SpringBootComponent } from './spring-boot/components/SpringBootComponent';
import { handleCallback as handleSpotifyCallback } from './spotify/routed';

import { createMiddleware as browserStorageMiddleware } from './browserstorage';


moment.locale('fr');


if (process.env.NODE_ENV !== 'production') {
  global.Perf = Perf;
}

// Combined reducers, create store

export const app = combineReducers({
  reddit,
  todos,
  loadingIndicator,
  errors,
  charts,
  spotify,
  springBoot,
  routing: routerReducer,
});


let middlewares = [];

if (process.env.NODE_ENV !== 'production') {
  middlewares = middlewares.concat([
    createLogger(),
  ]);
}

middlewares = middlewares.concat([
  routerMiddleware(browserHistory),
  thunkMiddleware,
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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(app, initialState, composeEnhancers(applyMiddleware(...middlewares)));

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
          <Route path="pagination" component={PaginationComponent}/>
          <Route path="spring-boot" component={SpringBootComponent}/>
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('content'),
);
