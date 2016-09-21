import 'jquery';

import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import promiseMiddleware from 'redux-promise-middleware';
import createLogger from 'redux-logger';

import 'foundation-sites/js/foundation.core';
import 'foundation-sites/dist/foundation.css';

import { todos, todoVisibility } from './todos/reducers';
import { TodoComponent } from './todos/containers';


// Combined reducers, create store

export const app = combineReducers({
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
      </Router>
    </Provider>
  ),
  document.getElementById('content'),
);
