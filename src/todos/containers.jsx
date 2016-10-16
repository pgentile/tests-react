import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';


import {
  TodoList as TodoListBase,
  AddTodoComponent as AddTodoComponentBase,
  TodoVisibilityComponent as TodoVisibilityComponentBase
} from './components';

import { PageComponent } from '../page/components';

import * as actions from './actions';


const getDoneTodosVisibility = (state) => state.todos.visibility.viewDone;
const getTodos = (state) => state.todos.list;

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


const TodoList = connect(
  (state) => {
    return {
      list: selectTodosByVisibility(state),
    };
  },
  {
    onDeleteItem: actions.deleteTodo,
    onMarkItemDone: actions.markDone,
  },
)(TodoListBase);


const AddTodoComponent = connect(
  null,
  {
    onAddItem: actions.addTodo,
  },
)(AddTodoComponentBase);


const TodoVisibilityComponent = connect(
  (state) => {
    return {
      viewDone: state.todos.visibility.viewDone,
      doneTodosCount: selectDoneTodosCount(state),
    };
  },
  {
    onDoneChange: actions.changeDoneVisibility,
  },
)(TodoVisibilityComponentBase);


export function TodoComponent() {
  return (
    <PageComponent title="TODOs">
      <AddTodoComponent/>
      <TodoList/>
      <TodoVisibilityComponent/>
    </PageComponent>
  );
}
