import PropTypes from 'prop-types';
import React from 'react';
import { Row, Column } from 'react-foundation';

import GlobalHealth from './GlobalHealth';
import ComponentsHealth from './ComponentsHealth';


export default class HealthInfo extends React.Component {

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
  health: PropTypes.object,
  onLoad: PropTypes.func.isRequired,
};
