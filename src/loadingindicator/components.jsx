import React from 'react';


export function LoadingIndicator({ active }) {
  if (active) {
    return (
      <p><b>Loading&hellip;</b></p>
    )
  }

  return null;
}

LoadingIndicator.propTypes = {
  active: React.PropTypes.bool.isRequired,
};

LoadingIndicator.defaultProps = {
  active: false,
};
