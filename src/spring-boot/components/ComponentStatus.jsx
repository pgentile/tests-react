import React from 'react';
import { Label, Colors } from 'react-foundation';


export default class ComponentStatus extends React.PureComponent {

  render() {
    const {status} = this.props;

    const successful = (status === 'UP');
    const color = successful ? Colors.SUCCESS : Colors.ALERT;

    return (
      <Label color={color}>{status}</Label>
    );
  }

}

ComponentStatus.propTypes = {
  status: React.PropTypes.string.isRequired,
};
