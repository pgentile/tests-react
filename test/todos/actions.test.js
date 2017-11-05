import { expect } from 'chai';

import * as actions from '../../src/todos/actions';


describe('Todo actions', () => {

  describe('addTodo', () => {

    it('should append content to todo list', () => {
      // given
      const content = 'New item';

      // when
      const action = actions.addTodo(content);

      // then
      expect(action).to.include({
        type: actions.ADD_TODO,
        content: content,
      });

    });

  });

});
