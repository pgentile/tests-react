import React from 'react';
import { Label, Colors } from 'react-foundation';


export default function GlobalHealth({status}) {
  const successful = (status === 'UP');
  const color = successful ? Colors.SUCCESS : Colors.ALERT;

  return (
    <Label color={color}>{status}</Label>
  );
}

GlobalHealth.propTypes = {
  status: React.PropTypes.string.isRequired,
};
