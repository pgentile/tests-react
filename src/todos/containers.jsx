import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';


import {
  BoxList as BoxListBase,
  AddBoxComponent as AddBoxComponentBase,
  TodoVisibilityComponent as TodoVisibilityComponentBase
} from './components';

import { PageComponent } from '../page/components';

import * as actions from './actions';


const getDoneTodosVisibility = (state) => state.todoVisibility.viewDone;
const getTodos = (state) => state.todos;

const selectTodosByVisibility = createSelector(
  [getDoneTodosVisibility, getTodos],
  (viewDone, todos) => {
    if (viewDone) {
      return todos;
    }

    return todos.filter(todo => !todo.done);
  },
);

const selectDoneTodosCount = createSelector(
  [getTodos],
  (todos) => {
    return todos.filter(todo => todo.done).size;
  },
);


const BoxList = connect(
  (state) => {
    return {
      list: selectTodosByVisibility(state),
    };
  },
  (dispatch) => {
    return {
      onDeleteItem: (id) => dispatch(actions.deleteTodo(id)),
      onMarkItemDone: (id) => dispatch(actions.markDone(id)),
    };
  },
)(BoxListBase);


const AddBoxComponent = connect(
  null,
  (dispatch) => {
    return {
      onAddItem: (content) => dispatch(actions.addTodo(content)),
    };
  },
)(AddBoxComponentBase);


const TodoVisibilityComponent = connect(
  (state) => {
    return {
      viewDone: state.todoVisibility.viewDone,
      doneTodosCount: selectDoneTodosCount(state),
    };
  },
  (dispatch) => {
    return {
      onDoneChange: (viewDone) => dispatch(actions.changeDoneVisibility(viewDone)),
    };
  },
)(TodoVisibilityComponentBase);


export function TodoComponent() {
  return (
    <PageComponent title="TODOs">
      <AddBoxComponent/>
      <BoxList/>
      <TodoVisibilityComponent/>
    </PageComponent>
  );
}
