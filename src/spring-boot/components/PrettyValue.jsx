import React from 'react';


export default function PrettyValue({value}) {
  return (
    <pre>{JSON.stringify(value, undefined, 2)}</pre>
  );
}

PrettyValue.propTypes = {
  value: React.PropTypes.any,
};
