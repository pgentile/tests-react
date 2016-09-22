import 'jquery';

import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import promiseMiddleware from 'redux-promise-middleware';
import createLogger from 'redux-logger';

import { todos, todoVisibility } from './todos/reducers';
import { TodoComponent } from './todos/containers';

import { reddit } from './reddit/reducers';
import { RedditComponent, RedditListComponent } from './reddit/containers';

import { PageWithNavbarComponent } from './navbar/components';

import 'foundation-sites/js/foundation.core';
import 'foundation-sites/dist/foundation.css';


// Combined reducers, create store

export const app = combineReducers({
  reddit,
  todos,
  todoVisibility,
  routing: routerReducer,
});

export const store = createStore(app, applyMiddleware(
  routerMiddleware(browserHistory),
  promiseMiddleware(),
  createLogger(),
));

const history = syncHistoryWithStore(browserHistory, store);


// Render box list

ReactDOM.render(
  (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={PageWithNavbarComponent}>
          <IndexRoute component={TodoComponent}/>
          <Route path="reddit" component={RedditComponent}>
            <Route path=":topic" component={RedditListComponent}/>
          </Route>
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('content'),
);
