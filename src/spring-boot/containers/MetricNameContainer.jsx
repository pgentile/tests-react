import { connect } from 'react-redux';

import MetricName from '../components/MetricName';


const MetricNameContainer = connect(
  state => {
    return {
      metricNameFilter: state.springBoot.metricNameFilter,
    };
  },
)(MetricName);

export default MetricNameContainer;
