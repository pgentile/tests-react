import 'babel-polyfill';

import moment from 'moment';

import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import freezeMiddleware from 'redux-freeze';

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
import SamplesComponent from './samples/components/SamplesComponent';
import ReduxFormPage from './reduxform/components/ReduxFormPage';
import ErrorBoundaryPage from './errorboundary/components/ErrorBoundaryPage';

import { createMiddleware as browserStorageMiddleware } from './browserstorage';


moment.locale('fr');


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
  form: formReducer,
});


const middlewares = [
  routerMiddleware(browserHistory),
  thunkMiddleware,
  promiseMiddleware(),
  browserStorageMiddleware(visibilityBrowserStorage, state => state.todos.visibility),
  browserStorageMiddleware(todoListBrowserStorage, state => state.todos.list),
];

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'production') {
  console.warn('Using the freeze middleware')
  middlewares.push(freezeMiddleware);
}

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
          <Route path="samples" component={SamplesComponent}/>
          <Route path="reduxform" component={ReduxFormPage}/>
          <Route path="errorboundary" component={ErrorBoundaryPage}/>
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('content'),
);
