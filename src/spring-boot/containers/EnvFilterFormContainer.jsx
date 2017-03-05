import { connect } from 'react-redux';

import EnvFilterForm from '../components/EnvFilterForm';
import * as actions from '../actions';


const EnvFilterFormContainer = connect(
  state => {
    return {
      envFilter: state.springBoot.envFilter,
    };
  },
  {
    onChange: actions.updateEnvFilter,
  },
)(EnvFilterForm);

export default EnvFilterFormContainer;
