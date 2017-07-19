import PropTypes from 'prop-types';
import React from 'react';
import { Row, Column } from 'react-foundation';

import ComponentTabsContainer from '../containers/ComponentTabsContainer';


export default class AboutComponent extends React.Component {

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
  loaded: PropTypes.bool.isRequired,
  instanceName: PropTypes.string.isRequired,
};
