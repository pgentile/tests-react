import { connect } from 'react-redux';

import EnvPropertyName from '../components/EnvPropertyName';


const EnvPropertyNameContainer = connect(
  state => {
    return {
      envFilter: state.springBoot.envFilter,
    };
  },
)(EnvPropertyName);

export default EnvPropertyNameContainer;
