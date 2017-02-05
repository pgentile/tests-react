import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import Metrics from '../components/Metrics';
import * as actions from '../actions';


const selectMetrics = createSelector(
  state => state.springBoot.metrics,
  state => state.springBoot.metricNameFilter,
  (metrics, metricNameFilter) => {

    // Filter metrics based on name
    if (metrics && metricNameFilter) {
      return metrics.filter(metric => {
        const nameIndex = metric.name.indexOf(metricNameFilter);
        return nameIndex >= 0;
      });
    }

    // All metrics
    return metrics;
  },
);

const MetricsContainer = connect(
  state => {
    return {
      metrics: selectMetrics(state),
    };
  },
  {
    onLoad: actions.getMetrics,
  },
)(Metrics);

export default MetricsContainer;
