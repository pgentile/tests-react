import React from 'react';
import { Callout, Colors } from 'react-foundation';


export default class GlobalHealth extends React.PureComponent {

  render() {
    const {status} = this.props;

    const successful = (status === 'UP');
    const color = successful ? Colors.SUCCESS : Colors.ALERT;
    const message = successful ? 'Component is up' : "Component doesn't seem to work";

    return (
      <Callout color={color}>
        <h5>{message}</h5>
        <p>Component global status: <b>{status}</b></p>
      </Callout>
    );
  }

}

GlobalHealth.propTypes = {
  status: React.PropTypes.string.isRequired,
};
