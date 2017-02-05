import React from 'react';
import { Row, Column } from 'react-foundation';

import GlobalHealth from './GlobalHealth';
import ComponentsHealth from './ComponentsHealth';


export default class HealthInfo extends React.Component {

  componentDidMount() {
    this.props.onLoad();
  }

  /*
  componentDidUpdate() {
    this.props.onLoad();
  }
  */

  render() {
    if (!this.props.health) {
      return null;
    }

    return (
      <div>
        <Row>
          <Column>
            <GlobalHealth status={this.props.health.status} />
          </Column>
        </Row>
        <Row>
          <Column>
            <ComponentsHealth components={this.props.health.components} />
          </Column>
        </Row>
      </div>
    );
  }

}

HealthInfo.propTypes = {
  health: React.PropTypes.object,
  onLoad: React.PropTypes.func.isRequired,
};
