import React from 'react';
import { connect } from 'react-redux';

import {
  BoxList as BoxListBase,
  AddBoxComponent as AddBoxComponentBase,
  TodoVisibilityComponent as TodoVisibilityComponentBase
} from './components';

import * as actions from './actions';


function selectTodosByVisibility(todos, viewDone) {
  if (viewDone) {
    return todos;
  }

  return todos.filter(todo => !todo.done);
}


const BoxList = connect(
  (state) => {
    return {
      list: selectTodosByVisibility(state.todos, state.todoVisibility.viewDone),
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
    <div>
      <AddBoxComponent/>
      <BoxList/>
      <TodoVisibilityComponent/>
    </div>
  );
};
