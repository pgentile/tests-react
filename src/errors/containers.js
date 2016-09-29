import { connect } from 'react-redux';

import { Error as ErrorBase } from './components';

import * as actions from './actions';


export const Error = connect(
  (state) => {
    return {
      message: state.errors.lastError,
    };
  },
  {
    onDismiss: actions.dismissError,
  },
)(ErrorBase);
