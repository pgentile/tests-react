import React from 'react';
import { Row, Column } from 'react-foundation';

import GlobalHealth from './GlobalHealth';
import ComponentsHealth from './ComponentsHealth';


export default class HealthInfo extends React.Component {

  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    if (!this.props.health) {
      return null;
    }

    return (
      <Row>
        <Column>
          <h4>Health</h4>
          <GlobalHealth status={this.props.health.status} />
          <ComponentsHealth components={this.props.health.components} />
        </Column>
      </Row>
    );
  }

}

HealthInfo.propTypes = {
  health: React.PropTypes.object,
  onLoad: React.PropTypes.func.isRequired,
};
