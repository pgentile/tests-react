import _ from 'lodash';
import uuid from 'uuid';
import Immutable from 'immutable';

import * as actions from './actions';


// Reducer

export function todos(state = Immutable.List(), action) {
  switch (action.type) {

    case actions.ADD_TODO:
      return state.push({
        id: uuid.v4(),
        content: action.content,
        done: false,
      });

    case actions.MARK_DONE:
      return state.map(todo => {
        if (todo.id !== action.id) {
          return todo;
        }

        const newTodo = _.cloneDeep(todo);
        newTodo.done = true;
        return newTodo;
      });

    case actions.DELETE_TODO:
      return state.filter(todo => {
        return todo.id !== action.id;
      });

    default:
      return state;

  }

}
