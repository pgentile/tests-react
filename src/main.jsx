import 'jquery';

import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import promiseMiddleware from 'redux-promise-middleware';
import createLogger from 'redux-logger';

import 'foundation-sites/js/foundation.core';
import 'foundation-sites/dist/foundation.css';

import { BoxList } from './box/box';
import { todos, addTodo, deleteTodo, markDone } from './box/box.flux';


// Combined reducers, create store

export const app = combineReducers({
  todos
});

export const store = createStore(app, applyMiddleware(
  promiseMiddleware(),
  createLogger(),
));


function mapStateToProps(state) {
  return {
    list: state.todos,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAddBox: content => dispatch(addTodo(content)),
    onRemoveBox: id => dispatch(deleteTodo(id)),
    onDone: id => dispatch(markDone(id)),
  };
}

export const LinkedBoxList = connect(mapStateToProps, mapDispatchToProps)(BoxList);


// Render box list
ReactDOM.render(
  (
    <Provider store={store}>
      <LinkedBoxList/>
    </Provider>
  ),
  document.getElementById('content')
);
