import React from 'react';
import { Row, Column } from 'react-foundation';

import ComponentTabsContainer from '../containers/ComponentTabsContainer';


export default class AboutComponent extends React.Component {

  componentDidMount() {
    this.props.onLoad(this.props.baseUrl);
  }

  componentDidUpdate(oldProps) {
    if (oldProps.baseUrl !== this.props.baseUrl) {
      this.props.onLoad(this.props.baseUrl);
    }
  }

  render() {
    if (!this.props.info) {
      return null;
    }

    return (
      <div>
        <Row>
          <Column>
            <h3>Instance {this.props.info['instance-info'].instance}</h3>
          </Column>
        </Row>
        <Row>
          <Column>
            <ComponentTabsContainer/>
          </Column>
        </Row>
      </div>
    );
  }

}

AboutComponent.propTypes = {
  onLoad: React.PropTypes.func.isRequired,
  baseUrl: React.PropTypes.string.isRequired,
  info: React.PropTypes.object,
};
