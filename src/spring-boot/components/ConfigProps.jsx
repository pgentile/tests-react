import React from 'react';
import { Row, Column } from 'react-foundation';

import PrettyValue from './PrettyValue';


export default class ConfigProps extends React.Component {

  componentDidMount() {
    this.props.onLoad();
  }

  /*
  componentDidUpdate() {
    this.props.onLoad();
  }
  */

  render() {
    let table = null;

    if (this.props.configProps) {
      const rows = [];

      let rowCount = 0;

      this.props.configProps.forEach(configProp => {
        const prefixRow = (
          <tr key={rowCount}>
            <td colSpan={2}>
              <b>Groupe <i title={configProp.group}>{configProp.prefix}</i></b>
            </td>
          </tr>
        );

        rows.push(prefixRow);
        rowCount++;

        configProp.properties.forEach(property => {
          const row = (
            <tr key={rowCount}>
              <td><code>{property.name}</code></td>
              <td><PrettyValue value={property.value}/></td>
            </tr>
          );

          rows.push(row);
          rowCount++;
        });
      });

      table = (
        <table className="unstriped">
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
          <h3>Configuration properties</h3>
          {table}
        </Column>
      </Row>
    );
  }


}

ConfigProps.propTypes = {
  configProps: React.PropTypes.array,
  onLoad: React.PropTypes.func.isRequired,
};
