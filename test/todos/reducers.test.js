import { JSDOM } from 'jsdom';
import { expect } from 'chai';

import * as actions from '../../src/todos/actions';
import * as reducers from '../../src/todos/reducers';

describe('Todo reducer', () => {

  before(() => {
    const dom = new JSDOM('<!doctype html><html><body></body></html>');

    // Non recommandé, mais bon, il faut avancer...
    global.document = dom.document;
    global.window = dom.window;
  });

  describe('state', () => {

    function createTodosWithThreeItems() {
      let state = undefined;

      const items = ['Item A', 'Item B', 'Item C'];

      items.forEach(item => {
        state = reducers.todos(state, actions.addTodo(item));
      });

      return state;
    }

    it('should return the initial state', () => {
      // given

      // when
      const state = reducers.todos(undefined, {});

      // then
      expect(state).to.be.empty();
    });

    it('should append new todo items on addTodo action', () => {
      // given
      let state = undefined;

      const items = ['Item A', 'Item B'];
      const newActions = items.map(item => actions.addTodo(item));

      // when
      newActions.forEach(action => {
        state = reducers.todos(state, action);
      });

      // then
      expect(state.length).to.equal(items.length);

      items.forEach((item, index) => {
        expect(state.get(index)).to.match({
          id: /^[a-z0-9-]+$/,
          content: item,
          done: false,
        });
      });
    });

    it('should mark todo item as done', () => {
      // given
      const initialState = createTodosWithThreeItems();

      // when
      const itemIndex = 1;
      const markDoneAction = actions.markDone(initialState.get(itemIndex).id);
      const newState = reducers.todos(initialState, markDoneAction);

      // then
      expect(newState.length).toEqual(initialState.length);

      newState.forEach((item, index) => {
        expect(item).to.match({
          done: (index === itemIndex),
        });
      });
    });

    it('should delete todo item', () => {
      // given
      const initialState = createTodosWithThreeItems();

      // when
      const itemIndex = 1;
      const itemToDeleteId = initialState.get(itemIndex).id;
      const deleteTodoAction = actions.deleteTodo(itemToDeleteId);
      const newState = reducers.todos(initialState, deleteTodoAction);

      // then
      expect(newState.length).to.equal(initialState.length - 1);

      newState.forEach((item) => {
        expect(item.id).to.not.equal(itemToDeleteId);
      });
    });

  });
});
