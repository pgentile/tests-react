import React from 'react';
import { connect } from 'react-redux';

import { BoxList as BoxListBase, AddBoxComponent as AddBoxComponentBase } from './components';
import * as actions from './actions';


const BoxList = connect(
  (state) => {
    return {
      list: state.todos,
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


export function TodoComponent() {
  return (
    <div>
      <AddBoxComponent/>
      <BoxList/>
    </div>
  );
};
