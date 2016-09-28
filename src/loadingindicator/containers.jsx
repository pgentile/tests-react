import { connect } from 'react-redux';

import { LoadingIndicator as LoadingIndicatorBase } from './components';


export const LoadingIndicator = connect(
  (state) => {
    return {
      active: state.loadingIndicator.count > 0,
    }
  },
)(LoadingIndicatorBase);
