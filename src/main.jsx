import 'jquery';

import React from 'react';
import ReactDOM from 'react-dom';

import Hello from './hello.js';
import BoxList from './box/box.jsx';

import 'foundation-sites/dist/foundation.css';
import 'foundation-sites/js/foundation.core.js';

// Render box list
ReactDOM.render(<BoxList/>, document.getElementById('content'));
