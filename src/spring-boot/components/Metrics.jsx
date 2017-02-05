import React from 'react';
import { Row, Column } from 'react-foundation';

import MetricValue from './MetricValue';
import MetricsFilterFormContainer from '../containers/MetricsFilterFormContainer';
import MetricNameContainer from '../containers/MetricNameContainer';


export default class Metrics extends React.Component {

  constructor(props) {
    super(props);

    this.timerRef = null;

    this.scheduleRefresh = this.scheduleRefresh.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    this.refresh();
  }

  componentWillUnmount() {
    clearTimeout(this.timerRef);
  }

  refresh() {
    this.props.onLoad().then(this.scheduleRefresh, this.scheduleRefresh);
  }

  scheduleRefresh() {
    this.timerRef = setTimeout(this.refresh, 5000);
  }

  render() {
    let table = null;

    if (this.props.metrics) {
      const rows = this.props.metrics.map(metric => {
        return (
          <tr key={metric.name}>
            <td><MetricNameContainer name={metric.name}/></td>
            <td><MetricValue value={metric.value} delta={metric.delta} /></td>
          </tr>
        );
      });

      table = (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      );
    }

    return (
      <div>
        <Row>
          <Column>
            <h4>Metrics</h4>
          </Column>
        </Row>
        <Row>
          <Column>
            <MetricsFilterFormContainer/>
          </Column>
        </Row>
        <Row>
          <Column>
            {table}
          </Column>
        </Row>
      </div>
    );
  }

}

Metrics.propTypes = {
  metrics: React.PropTypes.array,
  onLoad: React.PropTypes.func.isRequired,
};
