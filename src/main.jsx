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

import { todos, visibilityBrowserStorage } from './todos/reducers';
import { reddit } from './reddit/reducers';
import { loadingIndicator } from './loadingindicator/reducers';
import { charts } from './charts/reducers';
import { errors } from './errors/reducers';

import { TodoComponent } from './todos/containers';
import { BasePageComponent } from './page/components';
import { RedditComponent, RedditListComponent } from './reddit/routed';
import { ChartsComponent } from './charts/containers';

import { createMiddleware as browserStorageMiddleware } from './browserstorage';


// Combined reducers, create store

export const app = combineReducers({
  reddit,
  todos,
  loadingIndicator,
  errors,
  charts,
  routing: routerReducer,
});


let middlewares = [];

if (process.env.NODE_ENV !== 'production') {
  middlewares = middlewares.concat([
    require('redux-logger')(),
    require('redux-immutable-state-invariant')(),
  ]);
}

middlewares = middlewares.concat([
  routerMiddleware(browserHistory),
  promiseMiddleware(),
  browserStorageMiddleware(visibilityBrowserStorage, state => state.todos.visibility),
]);

export const store = createStore(app, applyMiddleware(...middlewares));

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
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('content'),
);
