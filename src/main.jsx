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
import createLogger from 'redux-logger';

import { todos, todoVisibility } from './todos/reducers';
import { reddit } from './reddit/reducers';
import { loadingIndicator } from './loadingindicator/reducers';
import { charts } from './charts/reducers';
import { errors } from './errors/reducers';

import { TodoComponent } from './todos/containers';
import { BasePageComponent } from './page/components';
import { RedditComponent, RedditListComponent } from './reddit/routed';
import { ChartsComponent } from './charts/containers';


// Combined reducers, create store

export const app = combineReducers({
  reddit,
  todos,
  todoVisibility,
  loadingIndicator,
  errors,
  charts,
  routing: routerReducer,
});


let middleware = [];

if (process.env.NODE_ENV === 'production') {
  middleware.push(require('redux-immutable-state-invariant')());
}

middleware = middleware.concat([
  routerMiddleware(browserHistory),
  promiseMiddleware(),
  createLogger(),
]);

export const store = createStore(app, applyMiddleware(...middleware));

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
