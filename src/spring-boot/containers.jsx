import { connect } from 'react-redux';

import * as actions from './actions';
import { SpringBootComponent } from './components';


export const SpringBootContainer = connect(
  state => {
    return {
      springBoot: state.springBoot,
    };
  },
  {
    onUrlChange: actions.changeBaseUrl,
  },
)(SpringBootComponent);
