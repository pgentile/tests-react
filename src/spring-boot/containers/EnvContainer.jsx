import { connect } from 'react-redux';

import Env from '../components/Env';
import * as actions from '../actions';


const EnvContainer = connect(
  state => {
    return {
      env: state.springBoot.env,
    };
  },
  {
    onLoad: actions.getEnv,
  },
)(Env);

export default EnvContainer;
