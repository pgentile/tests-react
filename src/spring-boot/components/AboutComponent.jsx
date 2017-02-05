import React from 'react';
import { Row, Column } from 'react-foundation';

import ComponentTabsContainer from '../containers/ComponentTabsContainer';


export default class AboutComponent extends React.Component {

  componentDidMount() {
    this.props.onLoad();
  }

  /*
  componentDidUpdate() {
    this.props.onLoad();
  }
  */

  render() {
    if (!this.props.loaded) {
      return null;
    }

    return (
      <div>
        <Row>
          <Column>
            <h3>Instance <i>{this.props.instanceName}</i></h3>
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
  loaded: React.PropTypes.bool.isRequired,
  instanceName: React.PropTypes.string.isRequired,
};
