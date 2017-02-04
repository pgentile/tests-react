import { connect } from 'react-redux';

import HealthInfo from '../components/HealthInfo';
import * as actions from '../actions';


const HealthInfoContainer = connect(
  state => {
    return {
      baseUrl: state.springBoot.baseUrl,
      health: state.springBoot.health,
    };
  },
  {
    onLoad: actions.getAppHealth,
  },
)(HealthInfo);

export default HealthInfoContainer;
