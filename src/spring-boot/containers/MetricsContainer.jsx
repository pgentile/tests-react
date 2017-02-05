import { connect } from 'react-redux';

import Metrics from '../components/Metrics';
import * as actions from '../actions';


const MetricsContainer = connect(
  state => {
    return {
      metrics: state.springBoot.metrics,
    };
  },
  {
    onLoad: actions.getMetrics,
  },
)(Metrics);

export default MetricsContainer;
