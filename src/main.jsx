import React from 'react';
import ReactDOM from 'react-dom';

import Hello from './hello.js';
import BoxList from './box/box.jsx';

let hello = new Hello();
console.log(`Hello result: ${hello}`);

ReactDOM.render(<BoxList/>, document.getElementById('content'));
