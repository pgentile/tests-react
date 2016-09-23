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
import { reddit } from './reddit/reducers';
import { loadingIndicator } from './loadingindicator/reducers';

import { TodoComponent } from './todos/containers';
import { RedditComponent, RedditListComponent } from './reddit/containers';
import { PageWithNavbarComponent }  from './navbar/containers';

import 'foundation-sites/js/foundation.core';


// Combined reducers, create store

export const app = combineReducers({
  reddit,
  todos,
  todoVisibility,
  loadingIndicator,
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
