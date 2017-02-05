import React from 'react';
import { Row, Column } from 'react-foundation';


export default class Metrics extends React.Component {

  componentDidMount() {
    this.props.onLoad();
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
