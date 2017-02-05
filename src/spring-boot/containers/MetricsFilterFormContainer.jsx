import { connect } from 'react-redux';

import MetricsFilterForm from '../components/MetricsFilterForm';
import * as actions from '../actions';


const MetricsFilterFormContainer = connect(
  state => {
    return {
      metricNameFilter: state.springBoot.metricNameFilter,
    };
  },
  {
    onChange: actions.updateMetricNameFilter,
  },
)(MetricsFilterForm);

export default MetricsFilterFormContainer;
