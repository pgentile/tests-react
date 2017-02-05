import React from 'react';
import { Row, Column } from 'react-foundation';


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
            <td><code>{metric.name}</code></td>
            <td>{metric.value}</td>
          </tr>
        );
      })

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
      <Row>
        <Column>
          <h4>Metrics</h4>
          {table}
        </Column>
      </Row>
    );
  }


}

Metrics.propTypes = {
  metrics: React.PropTypes.array,
  onLoad: React.PropTypes.func.isRequired,
};
