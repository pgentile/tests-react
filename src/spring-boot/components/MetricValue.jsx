import React from 'react';
import { Label, Colors } from 'react-foundation';


export default class MetricValue extends React.PureComponent {

  render() {
    const {value, delta} = this.props;

    if (delta > 0) {
      return (
        <Label color={Colors.SUCCESS}>{value.toLocaleString()} &#9650;</Label>
      );
    } else if (delta < 0) {
      return (
        <Label color={Colors.WARNING}>{value.toLocaleString()} &#9660;</Label>
      );
    } else {
      return (
        <span>{value.toLocaleString()}</span>
      );
    }
  }

}

MetricValue.propTypes = {
  value: React.PropTypes.number.isRequired,
  delta: React.PropTypes.number.isRequired,
};

MetricValue.defaultProps = {
  delta: 0,
};
