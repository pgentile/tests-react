import React from 'react';
import { Row, Column } from 'react-foundation';


export default class Env extends React.Component {

  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    if (!this.props.env) {
      return null;
    }

    const rows = [];

    this.props.env.properties.forEach(propertiesGroup => {
      const prefixRow = (
        <tr key={`GROUP:${propertiesGroup.group}`}>
          <td colSpan={2}>
            <b>Groupe <i>{propertiesGroup.group}</i></b>
          </td>
        </tr>
      );

      rows.push(prefixRow);

      propertiesGroup.properties.forEach(property => {
        const row = (
          <tr key={`PROP:${propertiesGroup.group}:${property.name}`}>
            <td><code>{property.name}</code></td>
            <td><pre>{property.value}</pre></td>
          </tr>
        );

        rows.push(row);
      });
    });

    const table = (
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

    return (
      <Row>
        <Column>
          <h4>Env</h4>
          {table}
        </Column>
      </Row>
    );
  }

}

Env.propTypes = {
  env: React.PropTypes.object,
  onLoad: React.PropTypes.func.isRequired,
};
