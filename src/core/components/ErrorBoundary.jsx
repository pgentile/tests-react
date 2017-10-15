import React from 'react';
import PropTypes from 'prop-types';

import { Callout, Colors } from 'react-foundation/';


export default class ErrorBoundary extends React.Component {

  static propTypes = {
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.state = {
      error: false,
    };
  }

  componentDidCatch(error, info) {
    this.setState({
      error: true,
    });

    console.error('Got an error...', error);
    console.error('More info about this error', info);
  }

  render() {
    if (!this.state.error) {
      return this.props.children;
    }

    return (
      <Callout color={Colors.ALERT}>
        <h5>Fatal error</h5>
        <p>We encountered a fatal error&hellip;</p>
      </Callout>
    );
  }

}
