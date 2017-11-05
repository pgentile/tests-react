import { JSDOM } from 'jsdom';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


// JSDOM setup

const dom = new JSDOM('<!doctype html><html><body></body></html>');

// Non recommandé pour le moment, mais bon, il faut avancer...
global.document = dom.document;
global.window = dom.window;


// Enzyme + React setup

Enzyme.configure({ adapter: new Adapter() });
