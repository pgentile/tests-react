import expect from 'expect';
import * as boxFlux from '../../src/box/box.flux';


describe('Todo actions', () => {

  describe('addTodo', () => {

    it('should append content to todo list', () => {
      // given
      const content = 'New item';

      // when
      const action = boxFlux.addTodo(content);

      // then
      expect(action).toEqual({
        type: boxFlux.ADD_TODO_ACTION,
        content: content,
      });
    });

  });

});


describe('Todo reducer', () => {

  describe('state', () => {

    function createTodosWithThreeItems() {
      let state = undefined;

      const items = ['Item A', 'Item B', 'Item C'];
      const actions = items.map(item => boxFlux.addTodo(item));

      actions.forEach(action => {
        state = boxFlux.todos(state, action);
      });

      return state;
    }

    it('should return the initial state', () => {
      // given

      // when
      const state = boxFlux.todos(undefined, {});

      // then
      expect(state).toEqual([]);
    });

    it('should append new todo items on addTodo action', () => {
      // given
      let state = undefined;

      const items = ['Item A', 'Item B'];
      const actions = items.map(item => boxFlux.addTodo(item));

      // when
      actions.forEach(action => {
        state = boxFlux.todos(state, action);
      });

      // then
      expect(state.length).toEqual(items.length);

      items.forEach((item, index) => {
        expect(state[index]).toMatch({
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
      const markDoneAction = boxFlux.markDone(initialState[itemIndex].id);
      const newState = boxFlux.todos(initialState, markDoneAction);

      // then
      expect(newState.length).toEqual(initialState.length);

      newState.forEach((item, index) => {
        expect(item).toMatch({
          done: (index === itemIndex),
        });
      });
    });

    it('should delete todo item', () => {
      // given
      const initialState = createTodosWithThreeItems();

      // when
      const itemIndex = 1;
      const itemToDeleteId = initialState[itemIndex].id;
      const deleteTodoAction = boxFlux.deleteTodo(itemToDeleteId);
      const newState = boxFlux.todos(initialState, deleteTodoAction);

      // then
      expect(newState.length).toEqual(initialState.length - 1);

      newState.forEach((item) => {
        expect(item.id).toNotEqual(itemToDeleteId);
      });
    });

  });
});
