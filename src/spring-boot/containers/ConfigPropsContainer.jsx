import { connect } from 'react-redux';

import ConfigProps from '../components/ConfigProps';
import * as actions from '../actions';


const ConfigPropsContainer = connect(
  state => {
    return {
      configProps: state.springBoot.configProps,
    };
  },
  {
    onLoad: actions.getConfigProps,
  },
)(ConfigProps);

export default ConfigPropsContainer;
