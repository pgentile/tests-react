import 'jquery';

import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise-middleware';
import createLogger from 'redux-logger';

import 'foundation-sites/js/foundation.core';
import 'foundation-sites/dist/foundation.css';

import { todos } from './box/reducers';
import { TodoComponent } from './box/containers';


// Combined reducers, create store

export const app = combineReducers({
  todos,
});

export const store = createStore(app, applyMiddleware(
  promiseMiddleware(),
  createLogger(),
));


// Render box list
ReactDOM.render(
  (
    <Provider store={store}>
      <TodoComponent/>
    </Provider>
  ),
  document.getElementById('content'),
);
