import { jsdom } from 'jsdom';

global.document = jsdom('<html><body></body></html>');
global.window = document.parentWindow;
global.navigator = {
  userAgent: 'node.js'
};


import React from 'react';
import { mount, shallow } from 'enzyme';

import { Box } from '../../src/todos/components';


describe('Todo components', () => {

  describe('<Box/>', () => {

    xit('should build new box', () => {

      const wrapper = mount(<Box />);


    });

  });

});
