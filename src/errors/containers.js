import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { Error as ErrorBase } from './components';
import * as actions from './actions';

const selectLastErrorMessage = createSelector(
  state => state.errors.errors,
  errors => errors.length > 0 ? errors[errors.length - 1] : null,
);

const selectErrorCount = createSelector(
  state => state.errors.errors,
  errors => errors.length,
)

export const Error = connect(
  (state) => {
    return {
      lastMessage: selectLastErrorMessage(state),
      errorCount: selectErrorCount(state),
    };
  },
  {
    onDismiss: actions.dismissError,
  },
)(ErrorBase);
