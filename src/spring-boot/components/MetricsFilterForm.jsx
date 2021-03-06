import PropTypes from 'prop-types';
import React from 'react';


export default class MetricsFilterForm extends React.PureComponent {

  constructor(props) {
    super(props);

    this.onMetricNameFilterChange = this.onMetricNameFilterChange.bind(this);
  }

  onMetricNameFilterChange(event) {
    event.preventDefault();
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <input
        type="text"
        placeholder="Fiter by metric name"
        value={this.props.metricNameFilter}
        onChange={this.onMetricNameFilterChange} />
    );
  }

}

MetricsFilterForm.propTypes = {
  metricNameFilter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
